import React, { useEffect } from "react";
import { useMyApi } from "./useMyApi";
import { useStore } from "./store";

const MyComponent: React.FC = () => {
  const { data, status } = useMyApi();
  const { data: storeData, initialize, addItem, removeItem } = useStore();

  useEffect(() => {
    if (status === "success") {
      initialize();
    }
  }, [status, initialize]);

  const handleAddItem = (item: string) => {
    addItem(item);
  };

  const handleRemoveItem = (item: string) => {
    removeItem(item);
  };

  return (
    <div>
      {Array.from(storeData).map((item, i) => (
        <div key={item}>
          {item} <button onClick={() => handleRemoveItem(item)}>Remove</button>
        </div>
      ))}
      <button
        onClick={() =>
          handleAddItem("Item " + Math.floor(Math.random() * 100000))
        }
      >
        Add Item
      </button>
    </div>
  );
};

export default MyComponent;
