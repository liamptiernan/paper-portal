import { Flex, Table } from "@mantine/core";
import { ActionButton } from "../../../components/Actions";

export function PublicationsTable() {
  // if no rows, big create one button
  const rows = [
    <tr>
      <td width={"50%"}>Greenville Times</td>
      <td width={"25%"}>Location</td>
      <td width={"25%"}>
        <Flex gap={"sm"}>
          <ActionButton>Ads</ActionButton>
          <ActionButton>View</ActionButton>
          <ActionButton>Edit</ActionButton>
        </Flex>
      </td>
    </tr>,
    <tr>
      <td>Greenville Times</td>
      <td>Location</td>
      <td>
        <Flex gap={"sm"}>
          <ActionButton>Ads</ActionButton>
          <ActionButton>View</ActionButton>
          <ActionButton>Edit</ActionButton>
        </Flex>
      </td>
    </tr>,
  ];

  return (
    <Table highlightOnHover verticalSpacing={"lg"} fontSize={"md"}>
      <tbody>{rows.map((row) => row)}</tbody>
    </Table>
  );
}
