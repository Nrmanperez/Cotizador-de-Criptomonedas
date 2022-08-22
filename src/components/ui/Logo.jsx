import React from "react";
import { Box, Image } from "@chakra-ui/react";
import DogCoin from '../../img/bitcoin.png'

export default function Logo(props) {
  return (
    <Box {...props}>
      <Image 
        src={DogCoin} 
        objectFit='cover'
        alt='Drinks' 
      />
    </Box>
  );
}