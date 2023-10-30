import { Stack, Title } from "@mantine/core";
import { ActionButton, PrimaryButton } from "../../components/Actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export function HomePage() {
  const { loginWithRedirect, logout, user, getAccessTokenSilently } =
    useAuth0();
  const [token, setToken] = useState<string>();
  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      setToken(token);
    };
    getToken();
  }, [getAccessTokenSilently, setToken]);

  useEffect(() => {
    async function testFetch() {
      if (!token) {
        return;
      }
      console.log(token);
      const res = await fetch("http://localhost:8000/api/v1/publications/", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(res);
    }
    testFetch();
  }, [token]);

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
