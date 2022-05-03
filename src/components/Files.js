import moment from "moment";
import React, { Component } from "react";
import { Table } from "antd";
import DataUploadModal from "./DataUploadModal";
import {
  Button,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  // Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import FilePicker from "chakra-ui-file-picker";
export default function Files(props) {
  const columns = [
    {
      title: "Name",
      dataIndex: "fileName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "Description",
    //   dataIndex: "fileDescription",
    //   key: "description",
    // },
    {
      title: "Type",
      dataIndex: "fileType",
      key: "type",
    },
    {
      title: "Size",
      dataIndex: "fileSize",
      key: "size",
      render: (text) => <a>{convertBytes(text)}</a>,
    },
    {
      title: "Date",
      dataIndex: "uploadTime",
      key: "date",
      render: (text) => <a>{moment.unix(text).format("h:mm:ss A M/D/Y")}</a>,
    },
    {
      title: "Owner",
      dataIndex: "uploader",
      key: "owner",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => (
        <Button
          onClick={() => {
            console.log(
              record,
              record.uploader,
              record.fileDescription,
              record.fileHash,
              props.account
            );
            props.dataContract.methods
              .OfferAContract(
                record.uploader,
                record.fileDescription,
                3600,
                record.fileHash
              )
              .send({
                from: props.account,
                value: window.web3.utils.toWei("1", "ether"),
              })
              .on("error", (e) => {
                window.alert("Error");
                console.log(e);
              });
          }}
        >
          Borrow
        </Button>
      ),
    },
  ];
  return (
    <Box p="5">
      <Box p="3">
        <Text fontSize="2xl" pb="3">
          Data Market
        </Text>
        <DataUploadModal
          captureFile={props.captureFile}
          uploadFile={props.uploadFile}
        />
      </Box>

      <Table columns={columns} dataSource={props.files}></Table>
    </Box>
  );
}
function convertBytes(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
