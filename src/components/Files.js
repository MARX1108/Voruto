import moment from "moment";
import React, { Component } from "react";
// import { Table } from "antd";
import DataUploadModal from "./DataUploadModal";
import ContractOfferingModal from "./ContractOfferingModal";
import {
  Button,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
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
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Action</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th isNumeric>Size</Th>
              <Th>Type</Th>
              <Th>Upload Time</Th>
              <Th>Owner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.files.map((item, i) => [
              <Tr>
                <Td>
                  <ContractOfferingModal
                    owner={item.uploader}
                    account={props.account}
                    fileHash={item.fileHash}
                    dataContract={props.dataContract}
                  />
                </Td>
                <Td>{item.fileName}</Td>
                <Td>{item.fileDescription}</Td>
                <Td>{item.fileSize}</Td>
                <Td>{item.fileType}</Td>
                <Td>
                  {moment.unix(item.uploadTime).format("h:mm:ss A M/D/Y")}
                </Td>
                <Td>{item.uploader}</Td>
              </Tr>,
            ])}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
function convertBytes(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
