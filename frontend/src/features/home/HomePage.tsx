import { Loader, Stack, Title } from "@mantine/core";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  // const { user } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    // if user is publisher, redirect to publisher
    // if user is customer, redirect to customer
    navigate("/publisher/publications");
  });
  return (
    <Stack justify="center" align="center" h="100vh" spacing={"xl"}>
      <Title>Loading your dashboard...</Title>
      <Loader color="brandSaffron" />
    </Stack>
  );
}

export const AuthHomePage = withAuthenticationRequired(HomePage);
