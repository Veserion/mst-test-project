import React from "react";

import { IStore, RootStore } from "../stores/RootStore";

const store = RootStore.create({});
export const StoreContext = React.createContext<IStore | null>(store);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
