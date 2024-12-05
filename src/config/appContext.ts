import { createContext } from "react";
import * as Realm from "realm-web";

export const AppContext = createContext<{
  appConfig?: Realm.App;
  setAppConfig: (value: Realm.App) => void;
}>({
  appConfig: undefined,
  setAppConfig: () => {},
});
