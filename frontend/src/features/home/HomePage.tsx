import { Stack, Title } from "@mantine/core";
import { ActionButton, PrimaryButton } from "../../components/Actions";
import { useAuth0 } from "@auth0/auth0-react";

export function HomePage() {
  const { loginWithRedirect, logout, user } = useAuth0();
  return (
    <>
      <Title>Welcome Home</Title>
      <PrimaryButton onClick={() => loginWithRedirect()}>Login</PrimaryButton>
      <ActionButton onClick={() => logout()}>Logout</ActionButton>
      {user && (
        <Stack>
          <Title order={2}>{user.name}</Title>
          <p>{user.email}</p>
        </Stack>
      )}
    </>
  );
}
