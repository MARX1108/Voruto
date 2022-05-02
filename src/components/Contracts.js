import moment from "moment";
import React, { Component, useState } from "react";
import { Table, message } from "antd";

import {
  Button,
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Code,
} from "@chakra-ui/react";

import { Typography } from "antd";

const { Paragraph } = Typography;

export default function Contracts(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [path, setFilePath] = useState("");

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
                  if (res) {
                    setFilePath(
                      "https://ipfs.infura.io/ipfs/" + record.fileHash
                    );
                    onOpen();
                  } else message.error("Your Contract Is No Longer Effective!");
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Access Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>You can access the data at:</Text>
              <Paragraph
                copyable
                style={{
                  backgroundColor: "#F5F7FE",
                  padding: "3px",
                  marginTop: "5px",
                  borderRadius: "5px",
                }}
              >
                {path}
              </Paragraph>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Table columns={columns} dataSource={props.contracts}></Table>
    </Box>
  );
}
