import { useNavigate } from "react-router-dom";
import { ActionButton } from "./Actions";

export function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Error</h1>
      <h2>404</h2>
      <p>The page you're trying to access does not exist</p>
      <ActionButton onClick={() => navigate("..")}>Return Home</ActionButton>
    </div>
  );
}
