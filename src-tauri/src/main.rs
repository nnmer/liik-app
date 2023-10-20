// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_log::{LogTarget};
use tauri::{Manager};
use tauri::{SystemTray, CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};

#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn main() {
    let menu_item_toggle_hide = CustomMenuItem::new("toggle_hide".to_string(), "Hide");
    let menu_item_quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let system_tray_menu = SystemTrayMenu::new()
        .add_item(menu_item_toggle_hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(menu_item_quit)
        ;
    let system_tray = SystemTray::new().with_menu(system_tray_menu);

    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);
            app.emit_all("single-instance", Payload { args: argv, cwd }).unwrap();
        }))
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_log::Builder::default().targets([
            LogTarget::LogDir,
            LogTarget::Stdout,
            LogTarget::Webview,
        ]).build())
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                let item_handle = app.tray_handle().get_item(&id);                
                match id.as_str() {            
                  "toggle_hide" => {                    
                    let window = app.get_window("main").unwrap();
                    let vvv = window.is_visible();
                    if vvv.ok().unwrap() {
                        window.hide().unwrap();
                        // you can also `set_selected`, `set_enabled` and `set_native_image` (macOS only).
                        item_handle.set_title("Show").unwrap();
                    } else {
                        window.show().unwrap();
                        item_handle.set_title("Hide").unwrap();
                    }
                    
                  }
                  "quit" => {
                    std::process::exit(0);
                  }
                  _ => {}
                }
              }
              _ => {}
            })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                let tray_item_handle = event.window().app_handle().tray_handle().get_item("toggle_hide");
                tray_item_handle.set_title("Show").unwrap();
                api.prevent_close();
            }
            _ => {}
            })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
