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
        <Text fontSize="2xl" pb="3" color={"white"}>
          Access History{" "}
          <IconButton
            color={"rgba(171,130,255,1)"}
            backgroundColor={"white"}
            _hover={{
              backgroundColor: "rgba(171,130,255,1)",
              color: "white",
            }}
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
              <Th color={"white"}>Contract #</Th>
              <Th color={"white"}>Access Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map((item, i) => {
              return [
                // <Tr>
                //   <Td color={"white"} border="none">
                //     Your Contract #{item} Is Accessed At 2021.4.3!
                //   </Td>
                // </Tr>,

                <Tr color={"white"}>
                  <Td>{item}</Td>
                  <Td>2021.4.3</Td>
                </Tr>,
              ];
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
