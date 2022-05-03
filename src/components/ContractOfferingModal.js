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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
} from "@chakra-ui/react";
export default function DataUpload(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [value, setValue] = React.useState("");
  let [stake, setStakingBalance] = React.useState(1);
  let [length, setLength] = React.useState(3600);

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <>
      <Button onClick={onOpen}>Borrow</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Offer A Contract</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box py="4">
              <Heading size={"md"}> Stake </Heading>
              <NumberInput
                defaultValue={1}
                min={0.1}
                value={stake}
                onChange={(val) => setStakingBalance(val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box py="4">
              <Heading size={"md"}> Contract Length </Heading>
              <NumberInput
                defaultValue={3600}
                value={length}
                onChange={(val) => setLength(val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box py="4">
              <Textarea
                borderRadius={"5px"}
                value={value}
                onChange={handleInputChange}
                placeholder="Please provide a description"
                size="sm"
              />
            </Box>
            <Button
              onClick={() => {
                props.dataContract.methods
                  .OfferAContract(
                    props.account,
                    value,
                    length.toString(),
                    props.fileHash
                  )
                  .send({
                    from: props.account,
                    value: window.web3.utils.toWei(stake.toString(), "ether"),
                  })
                  .on("error", (e) => {
                    window.alert("Error");
                    console.log(e);
                  })
                  .then(() => window.location.reload());
              }}
            >
              Upload
            </Button>
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
