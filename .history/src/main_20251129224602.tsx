import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom"; // <-- tambahkan ini

const queryClient = new QueryClient();

console.log("MAIN RENDER");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HashRouter>   
          <App />
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
