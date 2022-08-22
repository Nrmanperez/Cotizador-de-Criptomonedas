import {
  Select,
  FormControl,
  FormErrorMessage,
  Flex,
  Image,
  Stack,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  Button,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import {coins} from '../../data/coins'

export const Quote = () => {
  const [coinsSelected, setCoinsSelected] = useState({})
  const [result, setResult] = useState({})
  const [cryptos, setCryptos] = useState([])
  const [selectCryptos, setSelectCryptos] = useState('')
  const [selectCoins, setSelectCoins] = useState('')
  const [isError, setIsError] = useState(false)
  const [showData, setShowData] = useState(false)

  const handleSelectCryptos = (e) => {
    e.preventDefault()

    if (selectCryptos === '') {
      setIsError(true)
    }

    setIsError(false)

    setSelectCryptos(e.target.value)
  }

  const handleSelectCoins = (e) => {
    e.preventDefault()

    if (selectCoins === '') {
      setIsError(true)
    }

    setIsError(false)

    setSelectCoins(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectCryptos === '' && selectCoins === '') {
      setIsError(true)
      return
    }

    if (selectCryptos !== '' && selectCoins === '') {
      setIsError(true)
      return
    }

    if (selectCryptos === '' && selectCoins !== '') {
      setIsError(true)
      return
    }
    setIsError(false)

    setCoinsSelected({
      selectCryptos,
      selectCoins,
    })

    setShowData(true)
  }

  useEffect(() => {
    if (Object.keys(coinsSelected).length > 0) {
      const quoteCrypto = async () => {
        setResult({})

        const {selectCoins, selectCryptos} = coinsSelected
        const url = `${import.meta.env.VITE_API_QUOTE_URL}?fsyms=${selectCryptos}&tsyms=${selectCoins}`

        const res = await fetch(url)
        const result = await res.json()

        setResult(result.DISPLAY[selectCryptos][selectCoins])
      }

      quoteCrypto()
    }
  }, [coinsSelected])

  useEffect(() => {
    const getAPI = async () => {
      const url =
        `${import.meta.env.VITE_API_URL}?limit=20&tsym=USD`
      const resp = await fetch(url)
      const result = await resp.json()

      const arrayCryptos = result.Data.map((crypto) => {
        const objet = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        }
        return objet
      })

      setCryptos(arrayCryptos)
    }
    getAPI()
    setShowData(false)
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex w="80vw" gap="4" direction={{base: 'column', md: 'row'}}>
          <FormControl isInvalid={isError}>
            <Select
              id="coins"
              placeholder="Select Coins"
              name="coins"
              borderColor="blue.700"
              value={selectCoins}
              onChange={handleSelectCoins}
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </Select>
            {isError && selectCoins === '' && (
              <FormErrorMessage>This field is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isError}>
            <Select
              id="cryptos"
              placeholder="Select cryptos"
              name="cryptos"
              borderColor="blue.700"
              value={selectCryptos}
              onChange={handleSelectCryptos}
            >
              {cryptos.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </Select>
            {isError && selectCryptos === '' && (
              <FormErrorMessage>This field is required.</FormErrorMessage>
            )}
          </FormControl>
          <Popover>
            <PopoverTrigger>
              <Button
                type="submit"
                color="whiteAlpha.900"
                variant="solid"
                colorScheme="teal"
                w="200px"
              >Search</Button>
            </PopoverTrigger>
          </Popover>
        </Flex>
      </form>
      {showData ? (
        <Stack minH="69vh">
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
            gap="5"
            padding="5"
            direction={{base: 'column', md: 'row'}}
          >
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'30%'}
              h={'30%'}
              src={`https://cryptocompare.com/${result.IMAGEURL}`}
            />
            <VStack alignItems="flex-start">
              <Text fontSize="20px" color="teal">
                <li>{`The price is: ${result.PRICE}`}</li>
              </Text>
              <Text fontSize="20px" color="teal">
                <li>{`Highest price of the day: ${result.HIGHDAY}`}</li>
              </Text>
              <Text fontSize="20px" color="teal">
                <li>{`Lowest price of the day: ${result.LOWDAY}`}</li>
              </Text>
              <Text fontSize="20px" color="teal">
                <li>{`Variation last 24 hours: ${result.CHANGEPCT24HOUR}`}</li>
              </Text>
              <Text fontSize="20px" color="teal">
                <li>{`Last update: ${result.LASTUPDATE}`}</li>
              </Text>
            </VStack>
          </Flex>
        </Stack>
      ) : (
        <Stack minH="69vh" justifyContent="center">
          <Text fontSize="20px" color="teal">
            Search and trade cryptocurrencies.
          </Text>
        </Stack>
      )}
    </>
  )
}
