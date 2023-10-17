import { debug, warn, trace, info, error, attachConsole } from "tauri-plugin-log-api";

// with LogTarget::Webview enabled this function will print logs to the browser console
const detach = await attachConsole();

// detach the browser console from the log stream
// detach();

export default {
    debug: (data: any)=>debug(data?.toString()),
    trace: (data: any)=>trace(data?.toString()),
    info: (data: any)=>info(data?.toString()),
    warn: (data: any)=>warn(data?.toString()),
    error: (data: any)=>error(data?.toString()),
}