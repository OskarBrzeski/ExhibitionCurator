import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { CollectionProvider } from "./contexts/CollectionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CollectionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CollectionProvider>
  </StrictMode>
);
