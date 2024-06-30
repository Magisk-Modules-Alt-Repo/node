import { StringsProvider, ConfigProvider } from "@mmrl/providers";
import { withRequireNewVersion } from "@mmrl/hoc";

import { locales } from "./locale/index";
import { App } from "./App";

const configFIle = new SuFile(`/data/adb/mmrl/${__idname}.prop`);
if (!configFIle.exist()) {
  configFIle.create();
}

export default withRequireNewVersion({
  versionCode: 21918,
  component: () => {
    return (
      <StringsProvider data={locales}>
        <ConfigProvider
          loadFromFile={configFIle.getPath()}
          initialConfig={{
            notify: true,
            logging: false,
            service: true,
            desc: true,
          }}
          loader="ini"
        >
          <App />
        </ConfigProvider>
      </StringsProvider>
    );
  },
});
