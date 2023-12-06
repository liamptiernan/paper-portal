import { Flex, Text } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_Table,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { User, displayRoles } from "./types";
import { ActionButton } from "../../components/Actions";
import { useAppDispatch } from "../../app/hooks";
import { setActiveEditUser, setRolesModalOpen } from "./usersSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { User as Auth0User } from "@auth0/auth0-react";

function emptyTable() {
  return (
    <Text color="brandDark.2" align="center">
      No users created
    </Text>
  );
}

function ActionButtons({
  row,
  currentUser,
}: {
  row: User;
  currentUser?: Auth0User;
}) {
  const dispatch = useAppDispatch();
  const disabled = !currentUser || currentUser?.email === row.email;
  const handleEditOpen = () => {
    dispatch(setActiveEditUser(row));
    dispatch(setRolesModalOpen(true));
  };

  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <Flex gap={"sm"} justify={"start"}>
      <ActionButton disabled={disabled} onClick={handleEditOpen}>
        Edit
      </ActionButton>
      <ActionButton color="brandRed" disabled={disabled} onClick={handleDelete}>
        Remove
      </ActionButton>
    </Flex>
  );
}

export function UsersTable({
  users,
  isLoading,
}: {
  users?: User[];
  isLoading: boolean;
}) {
  const { user: currentUser } = useAuth0();
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorFn: (row) => {
          if (!row.email) {
            return "";
          }
          return row.email;
        },
        header: "Email",
      },
      {
        accessorFn: (row) => {
          if (!row.roles) {
            return "";
          }
          const roleLabels = row.roles.map((role) => displayRoles[role]);
          return roleLabels.join(", ");
        },
        header: "Permissions",
      },
      {
        accessorFn: (row) => {
          if (!row.email) {
            return "";
          }
          return <ActionButtons row={row} currentUser={currentUser} />;
        },
        header: "Actions",
      },
    ],
    [currentUser]
  );

  // TODO: Needs pagination
  const table = useMantineReactTable({
    columns,
    data: users || [],
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
      sx: {
        "thead > tr": {
          backgroundColor: "inherit",
          boxShadow: "none",
        },
        "thead > tr > th": {
          backgroundColor: "inherit",
        },
        "tbody > tr > td": {
          backgroundColor: "inherit",
        },
      },
    },
    renderEmptyRowsFallback: emptyTable,
    state: {
      isLoading,
    },
  });

  return <MRT_Table table={table} />;
}
