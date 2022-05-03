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
import { PlusOutlined } from "@ant-design/icons";

export default function AccessHistory(props) {
  return (
    <Box p="5">
      <Box p="3">
        <Text fontSize="2xl" pb="3">
          Payment History
        </Text>
      </Box>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Contract #</Th>
              <Th>Amount</Th>
              <Th>Pay Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.contracts.map((item, i) => {
              console.log(item.signedAt);
              return item.owner === props.account && item.signedAt !== "0"
                ? [
                    <Tr>
                      <Td>{item.Id}</Td>
                      <Td color={"green"} fontWeight="bold">
                        +{/* <PlusOutlined /> */}
                        {window.web3.utils.fromWei(
                          item.stakingBalance,
                          "ether"
                        )}{" "}
                        ETH
                      </Td>
                      <Td>
                        {moment.unix(item.signedAt).format("h:mm:ss A M/D/Y")}
                      </Td>
                    </Tr>,
                  ]
                : null;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
