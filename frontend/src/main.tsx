import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./app/theme.ts";

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
      <Wrapper
        apiKey="AIzaSyBEGicUH8Jh4d3GbVhC4BgMLQc4z6yyj7M"
        render={mapRender}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Wrapper>
    </MantineProvider>
  </React.StrictMode>
);
