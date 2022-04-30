import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

export default function Main() {
  return (
    <Box
      mx="100px"
      p={{ base: "20px", md: "30px" }}
      minH="100vh"
      mt="70px"
      // border={"5px solid"}
    >
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2} bg="white" borderRadius="25px">
          <Box mx="5" p="10">
            <Stat>
              <StatLabel>Balance</StatLabel>
              <StatNumber>345,670 ETH</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem colSpan={3} bg="white" borderRadius="25px" />
        <GridItem colSpan={2} bg="white" borderRadius="25px" />
        <GridItem colSpan={3} bg="white" borderRadius="25px" />
      </Grid>
    </Box>
  );
}
