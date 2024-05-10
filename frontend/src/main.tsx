import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./app/theme.ts";
import { Auth0ProviderWithNavigate } from "./components/Auth0WithNavigate.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Provider store={store}>
          <Notifications position="top-right" zIndex={2000} limit={5} />
          <Auth0ProviderWithNavigate>
            <App />
          </Auth0ProviderWithNavigate>
        </Provider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
