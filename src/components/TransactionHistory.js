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
              return item.owner === props.account
                ? [
                    <Tr>
                      <Td>{item.Id}</Td>
                      <Td>
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
