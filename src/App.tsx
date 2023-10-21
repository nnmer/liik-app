import { useState } from "react";
import DirectOpenAIApp from "./Apps/DirectOpenAIApp";
import ConfigContext, { Config } from "./modules/Config";

function App() {
  const [config, setConfig] = useState(Config.get())
  Config.setUpdateCallback(setConfig)

  return (
    <ConfigContext.Provider value={config}>
      <DirectOpenAIApp/>
    </ConfigContext.Provider>
  );
}

export default App;
