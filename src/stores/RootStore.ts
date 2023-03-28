import { types, Instance } from "mobx-state-tree";
import { FilterTypes, SortTypes } from "../types";
import { data } from "./testData";
import { TicketsStore } from "./TicketsStore";

export type RootStoreModel = Instance<typeof RootStore>

export const RootStore = types
  .model("RootStore", {
    ticketsStore: types.optional(TicketsStore, {
      tickets: data,
      selectedSort: SortTypes.PRICE,
      selectedFilters: [FilterTypes.ALL]
    })
  });

export interface IStore extends Instance<typeof RootStore> {}
