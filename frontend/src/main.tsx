import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { theme } from "./app/theme.ts";
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0ProviderWithNavigate } from "./components/Auth0WithNavigate.tsx";

const mapRender = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <></>;
    case Status.FAILURE:
      return <></>;
    case Status.SUCCESS:
      return <></>;
  }
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Wrapper
            apiKey="AIzaSyBEGicUH8Jh4d3GbVhC4BgMLQc4z6yyj7M"
            render={mapRender}
          >
            <App />
          </Wrapper>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
