import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "./Navbar"
export default function Dashboard(props) {
  return (
    <Box
      float="right"
      minHeight="100vh"
      height="100%"
      overflow="auto"
      position="relative"
      maxHeight="100%"
      w={{ base: "100%", xl: "calc( 100% - 290px )" }}
      maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
      transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      transitionDuration=".2s, .2s, .35s"
      transitionProperty="top, bottom, width"
      transitionTimingFunction="linear, linear, ease"
    >
      <Portal>
        <Box>
          <Navbar
            // onOpen={onOpen}
            // logoText={"Horizon UI Dashboard PRO"}
            // brandText={getActiveRoute(routes)}
            // secondary={getActiveNavbar(routes)}
            // message={getActiveNavbarText(routes)}
            // fixed={fixed}
            // {...rest}
          />
        </Box>
      </Portal>

      {/* <Footer /> */}
    </Box>
  );
}
