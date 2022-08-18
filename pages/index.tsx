import type { NextPage, GetServerSideProps } from 'next'
import type { Character } from 'rickmortyapi/dist/interfaces'
import type { ApiData } from '../types'

import { getCharacters } from 'rickmortyapi'
import { useState } from "react"

import GlobalHead from '../components/Global/GlobalHead'
import GlobalPagination from '../components/Global/GlobalPagination'
import CharacterList from '../components/Character/CharacterList'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await getCharacters()

  return {
    props: {
      data,
    },
  }
}

type Props = {
  data: ApiData
}

const Home: NextPage<Props> = ({ data }) => {
  const { results: defaultResults = [], info } = data

  const [pagination, setPagination] = useState({
    page: 1,
    pages: info.pages,
    total: info.count,
  })
  const [characters, setCharacters] = useState(defaultResults)

  const updatePage = async (page: number) => {
    const { data: { results = [] } } = await getCharacters({ page })
    setPagination({ ...pagination, page })
    setCharacters(results)
  }

  return (
    <div className="container-fluid">
      <GlobalHead title="Rick & Morty" />
      {/* <Search /> */}
      <CharacterList characters={characters} />
      <GlobalPagination pagination={pagination} updatePage={updatePage} />
    </div>
  )
}

export default Home
