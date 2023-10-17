import { fs, path } from '@tauri-apps/api'
import { BaseDirectory, appConfigDir } from '@tauri-apps/api/path'
import { flatten, unflatten } from 'flat';
import * as _obj from 'lodash'
import { createContext } from 'react';

const configFileName = 'config.json'

const mergeObj = (obj1: any, obj2: any) => {
    Object.keys(obj2).forEach(function (key: string) {
        if (key in obj1) {
        if (typeof obj1[key] === 'object') {
            mergeObj(obj1[key], obj2[key]);
        } else {
            obj1[key] = obj2[key];
        }
        }
    });
};

export interface ConfigData {
    defaultEndpoint: string,
    apps: {
        OpenAIDirect: {
            enabled: boolean,
            accessKey: string,
        },
    }
}

class SysConfig {
    #data: ConfigData
    #updateCallback: (value: object) => void
    ref: ConfigData  // this is a reference to the key in it's flatten prensentation

    constructor() {
        this.#data = {
            defaultEndpoint: '',
            apps: {
                OpenAIDirect: {
                    enabled: true,
                    accessKey: '',
                },
            }
        }
        
        this.#buildKeyReference()
    }

    #buildKeyReference() {
        this.ref = flatten(this.#data)
        Object.keys(this.ref).forEach(key=>this.ref[key]=key)
        this.ref = unflatten(this.ref)
    }

    async init() {
        // const appDataConfigDir = await appConfigDir()
        try {
            await fs.createDir('',{ dir: BaseDirectory.AppConfig, recursive: true })
        } catch(e) {

        }

        if (! await fs.exists(configFileName,{ dir: BaseDirectory.AppConfig})){
           await this.#writeToFile()
        } else {
            try {
                let _readData = JSON.parse(await fs.readTextFile(configFileName, {dir: BaseDirectory.AppConfig}))
                mergeObj(this.#data, _readData);                
            } catch (e) {
                // FIXME: show popup that config cannot read, fallback to default
            }
            
        }
    }

    get():ConfigData {
        return {...this.#data}
    }

    setUpdateCallback(callback: (value: object) => void ) {
        this.#updateCallback = callback
    }

    async #writeToFile(d:object=this.#data) {
        return fs.writeFile(configFileName, JSON.stringify(d, undefined, 2), {dir: BaseDirectory.AppConfig})
    }

    async updateKey(key: string, value: any) {
        var newData = this.get()
        // FIXME: do not save non existing keys
        _obj.set(newData, key, value)

        this.#data = newData
        this.#buildKeyReference()
        this.#writeToFile()
        this.#updateCallback(this.get())
    }
}
export const Config = new SysConfig()


const ConfigContext = createContext(null)

export default ConfigContext;
