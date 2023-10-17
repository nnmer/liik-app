import {Config} from "../../modules/Config";
import Chat from "./Chat";
import Setup from "./Setup";

export default function DirectOpenAI() {
    return (
        <div>
            {
                Boolean(Config.get().apps.OpenAIDirect.enabled)
                && Config.get().apps.OpenAIDirect.accessKey?.length > 0
                ? <Chat/>
                : <Setup />
            }
            
        </div>
    )
}