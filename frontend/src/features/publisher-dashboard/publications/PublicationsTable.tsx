import { Flex, Stack, Text } from "@mantine/core";
import { ActionButton } from "../../../components/Actions";
import {
  MRT_ColumnDef,
  MRT_Table,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { Publication } from "../types";
import { capitalizeFirstLetter } from "../../../app/utils";
import { useNavigate } from "react-router-dom";

function ActionButtons({ id }: { id: number }) {
  const navigate = useNavigate();
  return (
    <Flex gap={"sm"} justify={"center"}>
      <ActionButton onClick={() => navigate(`./${id}/edit`)}>Edit</ActionButton>
      <ActionButton>Ads</ActionButton>
    </Flex>
  );
}

export function PublicationsTable({
  publications,
}: {
  publications?: Publication[];
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
          return capitalizeFirstLetter(row.format);
        },
        header: "Format",
      },
      {
        accessorFn: (row) => {
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
    data: publications || [],
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
  });
  // if no rows, big create one button

  return <MRT_Table table={table} />;
}
