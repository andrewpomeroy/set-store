// storage.ts
export type DataType = Set<string>;

const STORAGE_KEY = "myStorageKey";

const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const storage = {
  async read(): Promise<DataType> {
    await delay(500); // Artificial delay of 500ms

    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return new Set();
    }
    return new Set<string>(JSON.parse(storedData));
  },

  async write(data: DataType): Promise<void> {
    await delay(500); // Artificial delay of 500ms

    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(data)));
  }
};
