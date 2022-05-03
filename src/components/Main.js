import {
  Flex,
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
import AccessHistory from "./AccessHistory";
import TransactionHistory from "./TransactionHistory";
import Contracts from "./Contracts";
export default function Main(props) {
  return (
    <Box mx="100px" p={{ base: "20px", md: "30px" }} minH="100vh" mt="70px">
      <Grid
        templateRows="300px repeat(3, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          colSpan={2}
          bg="white"
          borderRadius="25px"
          bgGradient="linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)"
        >
          <Flex p="10" pt="25%" color={"white"}>
            <Stat>
              <StatLabel>Balance</StatLabel>
              <StatNumber fontSize={"1.5rem"}>
                {props.balance
                  ? window.web3.utils.fromWei(props.balance, "ether")
                  : null}
                ETH
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" color={"white"} />
                23.36%
              </StatHelpText>
            </Stat>
          </Flex>
        </GridItem>

        <GridItem colSpan={3} bg="white" borderRadius="25px">
          <Contracts
            account={props.account}
            contracts={props.contracts}
            dataContract={props.dataContract}
          />
        </GridItem>
        <GridItem colSpan={3} bg="white" borderRadius="25px">
          <TransactionHistory
            account={props.account}
            dataContract={props.dataContract}
            contracts={props.contracts}
          />
        </GridItem>
        <GridItem
          colSpan={2}
          bg="white"
          borderRadius="25px"
          bgGradient="linear-gradient(135deg, rgba(171,130,255,1) 0%, rgba(79,73,217,1)100%)"
        >
          <AccessHistory
            account={props.account}
            dataContract={props.dataContract}
          />
        </GridItem>

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
