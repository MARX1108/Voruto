import moment from "moment";
import React, { Component, useState } from "react";
import { message } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

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
  HStack,
  SimpleGrid,
  useBreakpointValue,
  useColorModeValue,
  Stack,
  Heading,
  Flex,
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

import { Typography, Card } from "antd";

const { Paragraph } = Typography;

export default function Contracts(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [path, setFilePath] = useState("");
  const [contract, setContract] = useState([]);
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "Borrower",
    //   dataIndex: "borrower",
    //   key: "borrower",
    // },
    {
      title: "Balance",
      dataIndex: "stakingBalance",
      key: "stakingBalance",
    },
    {
      title: "Offer Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => <a>{moment.unix(text).format("h:mm:ss A M/D/Y")}</a>,
    },
    {
      title: "Signed Date",
      dataIndex: "signedAt",
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
                .send({ from: props.account })
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
                });
            }}
          >
            Sign
          </Button>
        ),
    },
  ];
  return (
    <Box p="5" height={"100%"}>
      <Box p="3">
        <Text fontSize="2xl" pb="3">
          Data Contracts
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Contract Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Contract ID</Td>
                      <Td>{contract.Id}</Td>
                    </Tr>
                    <Tr>
                      <Td>Description</Td>
                      <Td>{contract.description}</Td>
                    </Tr>
                    <Tr>
                      <Td>Stake</Td>
                      <Td>{contract.stakingBalance} Wei</Td>
                    </Tr>

                    <Tr>
                      <Td>Effective Length</Td>
                      <Td>{contract.length}</Td>
                    </Tr>
                    <Tr>
                      <Td>Data Owner</Td>
                      <Td>{contract.owner}</Td>
                    </Tr>
                    <Tr>
                      <Td>Data Borrower</Td>
                      <Td>{contract.borrower}</Td>
                    </Tr>
                    <Tr>
                      <Td>Creation Date</Td>
                      <Td>
                        {moment
                          .unix(contract.createdAt)
                          .format("h:mm:ss A M/D/Y")}
                      </Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Status</Th>

                      {contract.signed ? (
                        <Th color="green">
                          <ClockCircleOutlined /> Effective
                        </Th>
                      ) : (
                        <Th color="#8064EE">
                          <ClockCircleOutlined /> Offered & To Be Signed
                        </Th>
                      )}
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>

              <Box px={"5"} py={"5"} textAlign={"center"}>
                {contract.signed ? (
                  <>
                    <Text fontSize="md">You can access the data at:</Text>
                    <Button
                      py={"2"}
                      size={"sm"}
                      onClick={() => {
                        props.dataContract.methods
                          .AccessData(contract.Id)
                          .send({ from: props.account })
                          .then((res) => {
                            if (res) {
                              setFilePath(
                                "https://ipfs.infura.io/ipfs/" +
                                  contract.fileHash
                              );
                            } else
                              message.error(
                                "Your Contract Is No Longer Effective!"
                              );
                          });
                      }}
                    >
                      Show
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      props.dataContract.methods
                        .SignAContract(contract.Id)
                        .send({ from: props.account })
                        .on("error", (e) => {
                          window.alert("Error");
                        });
                      window.location.reload();
                    }}
                  >
                    Sign A Contract
                  </Button>
                )}
                <Box pt={"2"}>
                  {path.length !== 0 ? (
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
                  ) : null}
                </Box>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SimpleGrid
        overflowY={"scroll"}
        columns={{ base: 1, md: 4 }}
        gap={{ base: "5", md: "6" }}
        p="10px"
        height={"70%"}
      >
        {props.contracts.map((item, i) => {
          if (item.borrower === props.account || item.owner === props.account) {
            return (
              <Box
                px={{ base: "4", md: "6" }}
                py={{ base: "5", md: "6" }}
                bg="bg-surface"
                borderRadius="lg"
                border="2px solid #F5F7FE"
                _hover={{
                  border: "2px solid #8064EE",
                  boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.1)",
                  transitionDuration: " 0.4s, 0.4s, 0.4s, 0s",
                }}
                onClick={() => {
                  onOpen();
                  setContract(item);
                }}
              >
                <Stack>
                  {item.signed ? (
                    <Text fontSize="sm" color="green">
                      <CheckCircleOutlined /> Effective
                    </Text>
                  ) : (
                    <Text fontSize="sm" color="#8064EE">
                      <ClockCircleOutlined /> Offered
                    </Text>
                  )}

                  <Heading size={"sm"}>contract {item.Id}</Heading>
                  <Text fontSize="sm" color="grey">
                    ${window.web3.utils.fromWei(item.stakingBalance, "ether")}{" "}
                    ETH
                  </Text>
                </Stack>
              </Box>
            );
          }
        })}

        {}
      </SimpleGrid>

      {/* <Table columns={columns} dataSource={props.contracts}></Table> */}
    </Box>
  );
}
