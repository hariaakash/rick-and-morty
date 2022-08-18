import type { NextPage, GetServerSideProps } from 'next'
import type { Character, Location, CharacterLocation } from 'rickmortyapi/dist/interfaces'
import get from 'lodash/get'
import { getCharacter, getLocation } from 'rickmortyapi'
// import useCharacterStore from '../../../store/character'

import GlobalHead from '../../../components/Global/GlobalHead'
import Image from 'next/image'
import Link from 'next/link'
import CharacterBasic from '../../../components/Character/CharacterBasic'
import CharacterLocationInfo from '../../../components/Character/CharacterLocationInfo'

const fetchLocation = async (place: CharacterLocation) => {
  if (place.name !== 'unknown') {
    const locationId = place.url.split('/').slice(-1)
    const { data: origin } = await getLocation(Number(locationId))
    return origin
  }
  return null
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const { data: character } = await getCharacter(Number(id))

  const [origin, location] = await Promise.all([
    fetchLocation(character.origin),
    fetchLocation(character.location),
  ])

  return {
    props: {
      character,
      origin,
      location,
    },
  }
}

type Props = {
  character: Character,
  location: Location,
  origin: Location,
}

const Home: NextPage<Props> = ({ character, location, origin }) => {
  // const setCharacter = useCharacterStore((state) => state.setCharacter)
  // setCharacter(data)
  // const character = useCharacterStore((state) => state.character)
  // console.log(character)
  // console.log(location)
  // console.log(origin)

  return (
    <div className="container-fluid">
      <GlobalHead title={character.name} />
      <div className="pb-4 flex justify-center">
        <Link href="/">
          <button className="mx-auto px-5 py-2.5 font-medium bg-red-50 hover:bg-red-100 hover:text-red-600 text-red-500 rounded-lg text-sm">
            Go Back
          </button>
        </Link>
      </div>
      {
        character &&
        <div className="flex flex-col md:flex-row">
          <div className="basis-1/2 flex justify-center">
            {
              character &&
              <Image
                src={character.image}
                alt={character.name}
                width="500"
                height="500"
                className="rounded-2xl"
              />
            }
          </div>
          <div className="basis-1/2 flex flex-col">
            <CharacterBasic character={character} />
            <CharacterLocationInfo location={origin} title="Origin" />
            <CharacterLocationInfo location={location} title="Last Seen" />
          </div>
        </div>
      }
    </div>
  )
}

export default Home
