import {
  Text,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Files from "./Files";
import Contracts from "./Contracts";
export default function Main(props) {
  return (
    <Box
      mx="100px"
      p={{ base: "20px", md: "30px" }}
      minH="100vh"
      mt="70px"
    >
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2} bg="white" borderRadius="25px">
          <Box mx="5" p="10">
            <Stat>
              <StatLabel>Balance</StatLabel>
              <StatNumber>
                {props.balance
                  ? window.web3.utils.fromWei(props.balance, "ether")
                  : null}
                ETH
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem colSpan={3} bg="white" borderRadius="25px">
          <Contracts
            account={props.account}
            contracts={props.contracts}
            dataContract={props.dataContract}
          />
        </GridItem>
        <GridItem colSpan={2} bg="white" borderRadius="25px" />
        <GridItem colSpan={3} bg="white" borderRadius="25px" />

        <GridItem colSpan={5} bg="white" borderRadius="25px">
          <Files
            account={props.account}
            files={props.files}
            captureFile={props.captureFile}
            uploadFile={props.uploadFile}
            dataContract={props.dataContract}
          ></Files>
        </GridItem>
      </Grid>
    </Box>
  );
}
