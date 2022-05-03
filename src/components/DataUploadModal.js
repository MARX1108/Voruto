import moment from "moment";
import React, { Component } from "react";

import {
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import FilePicker from "chakra-ui-file-picker";
export default function DataUpload(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [value, setValue] = React.useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <>
      <Button
        onClick={onOpen}
        background={
          "linear-gradient(135deg, rgba(171,130,255,1) 0%, rgba(79,73,217,1) 100%)"
        }
        color={"white"}
        _hover={{
          background:
            " linear-gradient(135deg, rgba(146,114,213,1) 0%, rgba(58,53,166,1) 100%)",
          color: "white",
        }}
      >
        Upload Your Data
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FilePicker
              onFileChange={(fileList) => {
                props.captureFile(fileList[0]);
              }}
              placeholder="Upload Your Data"
              hideClearButton={true}
            />

            <Box py="4">
              <Textarea
                borderRadius={"5px"}
                value={value}
                onChange={handleInputChange}
                placeholder="Please provide a description"
                size="sm"
              />
            </Box>
            <Button onClick={() => props.uploadFile(value)}>Upload</Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
