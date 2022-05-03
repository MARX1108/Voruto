import React, { Component, useState } from "react";
import { Flex, Link, IconButton, Center } from "@chakra-ui/react";
import {
  GithubFilled,
  LinkedinFilled,
  InstagramFilled,
  BehanceSquareFilled,
} from "@ant-design/icons";

export default function Footer(props) {
  return (
    <Flex position="absolute" bottom="5">
      <Link href="https://github.com/marx1108/voruto" target="_blank">
        <IconButton icon={<GithubFilled />} isRound="true" size="md" m="1" />
      </Link>
      <Link href="https://www.linkedin.com/in/marx1108" target="_blank">
        <IconButton icon={<LinkedinFilled />} isRound="true" size="md" m="1" />
      </Link>
      <Link href="https://www.instagram.com/marxw_1108/" target="_blank">
        <IconButton icon={<InstagramFilled />} isRound="true" size="md" m="1" />
      </Link>
      <Link href="https://www.behance.net/MarxW" target="_blank">
        <IconButton
          icon={<BehanceSquareFilled />}
          isRound="true"
          size="md"
          m="1"
        />
      </Link>
    </Flex>
  );
}
