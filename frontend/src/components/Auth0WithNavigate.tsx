import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={"IaghBtXBVqY6KVhCdhl21WA7hqqTN7sw"}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
