import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'

export const Toplist = () => {
  const [topList, setTopList] = useState([])
  let arrays = []

  useEffect(() => {
    const getTopList = async () => {
      const url = import.meta.env.VITE_API_TOP_LIST_URL
      const resp = await fetch(url)
      const {Data} = await resp.json()
      setTopList(Data)
    }

    getTopList()
  }, [])

  for (let i = 0; i < topList.length; i++) {
    const fullName = topList[i].CoinInfo.FullName
    const name = topList[i].CoinInfo.Name
    const imageUrl = topList[i].CoinInfo.ImageUrl
    const rating = topList[i].CoinInfo.Rating.Weiss.Rating
    arrays.push({
      fullName,
      name,
      imageUrl,
      rating,
    })
  }

  return (
    <TableContainer >
      <Table variant="simple" size="lg">
        <TableCaption>Top 10</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Rating</Th>
          </Tr>
        </Thead>
        <Tbody>
          {arrays.map((array) => (
            <Tr key={array.name}>
              <Td fontWeight="bold">{array.fullName}</Td>
              <Td>
                <Image
                  alt={'Crypto image'}
                  fit={'cover'}
                  align={'center'}
                  w={'35px'}
                  h={'35px'}
                  src={`https://cryptocompare.com/${array.imageUrl}`}
                />
              </Td>
              <Td fontWeight="bold">{array.rating}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Rating</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}
