import { Route, RouteProps } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface ProtectedRouteProps {
  protectedElement: React.ComponentType;
}

// export function ProtectedRoute(props: RouteProps & ProtectedRouteProps) {
//   const Element = withAuthenticationRequired(props.protectedElement);

//   return <Route element={<Element />} {...props} />;
// }

export function ProtectedRoute(props: RouteProps) {
  return (
    <>
      <Route {...props} />
    </>
  );
}
