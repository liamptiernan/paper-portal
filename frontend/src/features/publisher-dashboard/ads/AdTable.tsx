import { Stack, Text } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_Table,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { AdOffering } from "../types";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../../components/Actions";

function ActionButtons({ id }: { id: number }) {
  const navigate = useNavigate();
  return <ActionButton onClick={() => navigate(`./${id}`)}>Edit</ActionButton>;
}

export function AdsTable({
  offerings,
  isLoading,
}: {
  offerings?: AdOffering[];
  isLoading: boolean;
}) {
  const columns = useMemo<MRT_ColumnDef<AdOffering>[]>(
    () => [
      {
        accessorFn: (row) => {
          return (
            <Stack spacing={"xs"}>
              <Text fw={"bold"}>{row.name}</Text>
            </Stack>
          );
        },
        header: "Name",
      },
      {
        accessorFn: (row) => {
          if (!row.impact_score) {
            return "";
          }
          return row.impact_score;
        },
        header: "Impact",
      },
      {
        accessorFn: (row) => {
          if (!row.size) {
            return "";
          }
          return row.size;
        },
        header: "Size",
      },
      {
        accessorFn: (row) => {
          if (!row.page_start) {
            return "";
          }
          if (!row.page_end) {
            return `${row.page_start} - End`;
          }
          return `${row.page_start} - ${row.page_end}`;
        },
        header: "Page Range",
      },
      {
        accessorFn: (row) => {
          return <ActionButtons id={row.id} />;
        },
        header: "Action",
      },
    ],
    []
  );

  // TODO: Needs pagination
  const table = useMantineReactTable({
    columns,
    data: offerings || [],
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
    state: {
      isLoading,
    },
  });

  return <MRT_Table table={table} />;
}
