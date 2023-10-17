import Config from "../../modules/Config";
import Setup from "./Setup";

function App () {
    return (
        <>OPenAI </>
    )
}

export default function DirectOpenAI() {
    return (
        <div>
            {
                Config.get().apps.OpenAIDirect.enabled
                && Config.get().apps.OpenAIDirect.accessKey?.length > 0
                ? <App/>
                : <Setup />
            }
            
        </div>
    )
}