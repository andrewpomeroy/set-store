// store.ts
import create from "zustand";
import { combine } from "zustand/middleware";
import { storage, DataType } from "./storage";

type StoreState = {
  data: DataType;
  initialize: () => Promise<void>;
  addItem: (item: string) => Promise<void>;
  removeItem: (item: string) => Promise<void>;
};

const batch = (actions: (() => Promise<void>)[]): (() => Promise<void>) => {
  let pendingPromise: Promise<void> | null = null;
  let batchedActions: (() => Promise<void>)[] = [];

  return async () => {
    if (!pendingPromise) {
      pendingPromise = new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 0));
        for (const action of batchedActions) {
          await action();
        }
        batchedActions = [];
        pendingPromise = null;
        resolve();
      });
    }
    batchedActions = actions;
    return pendingPromise;
  };
};

export const useStore = create<StoreState>(
  combine({ data: new Set() }, (set, get) => ({
    initialize: async () => {
      const data = await storage.read();
      set({ data });
    },

    addItem: async (item: string) => {
      const data = get().data;
      data.add(item);
      set({ data });

      const batchedActions = batch([
        async () => {
          const mostRecentData = await storage.read();
          mostRecentData.add(item);
          await storage.write(mostRecentData);
        }
      ]);
      await batchedActions();
    },

    removeItem: async (item: string) => {
      const data = get().data;
      data.delete(item);
      set({ data });

      const batchedActions = batch([
        async () => {
          const mostRecentData = await storage.read();
          mostRecentData.delete(item);
          await storage.write(mostRecentData);
        }
      ]);
      await batchedActions();
    }
  }))
);
