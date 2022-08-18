import type { NextPage, GetServerSideProps } from 'next'
import type { Character } from 'rickmortyapi/dist/interfaces'
import { getCharacter } from 'rickmortyapi'

import CharacterCard from '../../../components/Character/CharacterCard'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { data } = await getCharacter(Number(id))

  return {
    props: {
      data,
    },
  }
}

type Props = {
  data: Character
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <div className="container-fluid">
      <CharacterCard character={data} />
    </div>
  )
}

export default Home
