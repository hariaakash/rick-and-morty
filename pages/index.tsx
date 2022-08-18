import type { NextPage, GetServerSideProps } from 'next'
import type { Info, Character } from 'rickmortyapi/dist/interfaces'
import { getCharacters } from 'rickmortyapi'

import GlobalHead from '../components/Global/GlobalHead'
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
  data: Info<Character[]>
}

const Home: NextPage<Props> = ({ data }) => {
  const { results: defaultResults = [], info } = data;

  return (
    <div className="container-fluid">
      <GlobalHead />
      {/* <Search /> */}
      <CharacterList characters={defaultResults} />
    </div>
  )
}

export default Home
