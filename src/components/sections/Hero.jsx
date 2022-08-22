
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Flex,
  Image
} from '@chakra-ui/react';
// import ImageHero from '../../img/imgHero.webp'

export default function Hero() {
  return (
    <>
      <Container maxW={'3xl'} minH="73.8vh">
      <Flex mb="5" direction="column">
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 10 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            App Web, <br />
            <Text as={'span'} color={'green.400'}>
              Cryptos App
            </Text>
          </Heading>
          <Text color={'gray.500'}>
          Web app that quotes the price of the different types of cryptocurrencies and gives you the updated price along with its lowest prices of the day, you can also see the top 10 of the main currencies in the last 24 hours.
          </Text>
        </Stack>
        
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              'https://d500.epimg.net/cincodias/imagenes/2020/10/27/companias/1603798933_665387_1603799349_noticia_normal_recorte1.jpg'
            }
            objectFit={'cover'}
          />
        </Flex>
      </Container>
    </>
  );
}