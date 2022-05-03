import moment from "moment";
import React, { Component, useState } from "react";
import { message } from "antd";

import {
  Button,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { RedoOutlined } from "@ant-design/icons";

export default function AccessHistory(props) {
  const [history, setHistory] = useState([]);

  return (
    <Box p="5">
      <Box p="3">
        <Text fontSize="2xl" pb="3">
          Access History
          <IconButton
            aria-label="Refresh"
            icon={<RedoOutlined />}
            size="sm"
            onClick={() => {
              props.dataContract.methods
                .getAccessHistory()
                .call()
                .then((res) => {
                  console.log(res);
                  setHistory(res);
                });
            }}
          />
        </Text>
      </Box>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Contract #</Th>
              <Th>Acess Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map((item, i) => {
              return [
                <Tr>
                  <Td>{item}</Td>
                  <Td>2021.4.32</Td>
                </Tr>,
              ];
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
