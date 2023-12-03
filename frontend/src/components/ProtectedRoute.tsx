import { Route, RouteProps } from "react-router-dom";
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
