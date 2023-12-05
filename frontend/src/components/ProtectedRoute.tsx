import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

export function ProtectedRoute(protectedElement: React.ComponentType<object>) {
  return withAuthenticationRequired(protectedElement);
}
