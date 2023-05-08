import "./styles.css";
import MyComponent from "./MyComponent";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <QueryClientProvider client={queryClient}>
        <MyComponent />
      </QueryClientProvider>
    </div>
  );
}
