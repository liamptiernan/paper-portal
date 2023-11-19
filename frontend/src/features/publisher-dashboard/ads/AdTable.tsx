import { Stack, Text } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_Table,
  MRT_TableInstance,
  useMantineReactTable,
} from "mantine-react-table";
import { useCallback, useMemo, useState } from "react";
import { AdOffering } from "../types";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../../components/Actions";
import { useUpdateAdOfferingOrderMutation } from "../publications/publicationsApi";
import { useTryToast } from "../../../hooks/useTryToast";
import { currencyFormatter } from "../../../app/utils";

function ActionButtons({ id }: { id: number }) {
  const navigate = useNavigate();
  return <ActionButton onClick={() => navigate(`./${id}`)}>Edit</ActionButton>;
}

export function AdsTable({ offerings }: { offerings?: AdOffering[] }) {
  const [reOrder] = useUpdateAdOfferingOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useTryToast(
    { title: "Order Saved" },
    { title: "Order failed to save" }
  );
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
          return `${(row.impact_score * 100).toFixed(2)} %`;
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
          if (!row.price) {
            return "";
          }
          return currencyFormatter.format(row.price);
        },
        header: "Price",
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

  const handleReorder = useCallback(
    async (table: MRT_TableInstance<AdOffering>) => {
      if (!offerings) {
        return;
      }
      // TODO: fix dragging. Add impact update to create and delete
      const newOrder = offerings.map((offering) => offering.id).reverse();
      const { draggingRow, hoveredRow } = table.getState();
      if (hoveredRow && draggingRow) {
        const draggedId = newOrder.splice(draggingRow.original.index, 1)[0];
        newOrder.splice(
          (hoveredRow as MRT_Row<AdOffering>).original.index,
          0,
          draggedId
        );
      }
      try {
        setIsLoading(true);
        await toast(reOrder(newOrder).unwrap);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [offerings, toast, reOrder]
  );

  // TODO: Needs pagination
  const table = useMantineReactTable({
    columns,
    data: offerings || [],
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableRowDragging: true,
    enableRowOrdering: true,
    mantineRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => handleReorder(table),
      color: "brandDark.7",
    }),
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
