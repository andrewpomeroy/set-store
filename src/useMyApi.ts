import { useQuery } from "@tanstack/react-query";
import { storage, DataType } from "./storage";

const fetchData = async (): Promise<DataType> => {
  return await storage.read();
};

export const useMyApi = (options?: any) => {
  return useQuery<DataType>("my-key", fetchData, options);
};
