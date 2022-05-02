import moment from "moment";
import React, { Component } from "react";
import { Table, message } from "antd";

import {
  Button,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
} from "@chakra-ui/react";
export default function Files(props) {
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Borrower",
      dataIndex: "borrower",
      key: "borrower",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => <a>{moment.unix(text).format("h:mm:ss A M/D/Y")}</a>,
    },

    {
      title: "Signed",
      dataIndex: "signed",
      render: (_, record) =>
        record.signed ? (
          <Button
            onClick={() => {
              props.dataContract.methods
                .AccessData(record.Id)
                .call({ from: props.account })
                .then((res) => {
                  if (res)
                    message.error("Your Contract Is No Longer Effective!");
                });
            }}
          >
            Access
          </Button>
        ) : (
          <Button
            onClick={() => {
              console.log(record);
              props.dataContract.methods
                .SignAContract(record.Id)
                .send({ from: props.account })
                .on("error", (e) => {
                  window.alert("Error");
                  console.log(e);
                });
            }}
          >
            Sign
          </Button>
        ),
    },
  ];
  return (
    <Box p="5">
      <Box p="3">
        <Text fontSize="2xl" pb="3">
          Data Contracts
        </Text>
      </Box>

      <Table columns={columns} dataSource={props.contracts}></Table>
    </Box>
  );
}
