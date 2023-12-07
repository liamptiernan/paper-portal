export enum UserRoles {
  PUBADMIN = "PUBADMIN",
}

export const displayRoles = {
  PUBADMIN: "Publication Admin",
};

export const roleOptions = [{ value: "PUBADMIN", label: "Publication Admin" }];

export interface User {
  id: number;
  org_id: number;
  given_name: string;
  family_name: string;
  auth_id: string;
  email: string;
  roles: UserRoles[];
}

export interface UserInvite {
  id: number;
  org_id: number;
  target_email: string;
  target_roles: UserRoles[];
  accepted: boolean;
}
