import moment from "moment";
import React, { Component } from "react";

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
} from "@chakra-ui/react";
import FilePicker from "chakra-ui-file-picker";
export default function Files(props) {
  return (
    <Box p="5">
      <Box p="3">
        <FilePicker
          onFileChange={(fileList) => {
            props.captureFile(fileList[0]);
          }}
          placeholder="Upload Your Data"
          hideClearButton={true}
        />
        <Button onClick={() => props.uploadFile(" ")}>Upload</Button>
      </Box>

      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th isNumeric>id</Th>
              <Th>name</Th>
              <Th>description</Th>
              <Th>type</Th>
              <Th>size</Th>
              <Th>date</Th>
              <Th>owner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.files.map((file, key) => {
              return (
                <tr>
                  <Td>{file.fileId}</Td>
                  <Td>{file.fileName}</Td>
                  <Td>{file.fileDescription}</Td>
                  <Td>{file.fileType}</Td>
                  <Td>{convertBytes(file.fileSize)}</Td>
                  <Td>
                    {moment.unix(file.uploadTime).format("h:mm:ss A M/D/Y")}
                  </Td>
                </tr>
              );
            })}
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
