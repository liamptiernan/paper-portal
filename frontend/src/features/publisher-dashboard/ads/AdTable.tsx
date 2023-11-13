import { Stack, Text } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_Table,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { Publication } from "../types";
import { capitalizeFirstLetter } from "../../../app/utils";

export function AdsTable({
  //   ads,
  isLoading,
}: {
  //   ads?: AdUnits[];
  isLoading: boolean;
}) {
  const columns = useMemo<MRT_ColumnDef<Publication>[]>(
    () => [
      {
        accessorFn: (row) => {
          return (
            <Stack spacing={"xs"}>
              <Text fw={"bold"}>{row.name}</Text> <Text>{row.description}</Text>
            </Stack>
          );
        },
        header: "Name",
      },
      {
        accessorFn: (row) => {
          if (!row.format) {
            return "";
          }
          return capitalizeFirstLetter(row.format);
        },
        header: "Format",
      },
      {
        accessorFn: (row) => {
          if (!row.estimated_reach && !row.distribution_unit) {
            return "";
          }
          return `${row.estimated_reach} ${row.distribution_unit}`;
        },
        header: "Distribution",
      },
      {
        accessorFn: (row) => {
          return <ActionButtons id={row.id} />;
        },
        header: "Actions",
      },
    ],
    []
  );

  // TODO: Needs pagination
  const table = useMantineReactTable({
    columns,
    data: [],
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
      highlightOnHover: false,
      withColumnBorders: true,
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
    state: {
      isLoading,
    },
  });

  return <MRT_Table table={table} />;
}
