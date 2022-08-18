import type { NextPage, GetServerSideProps } from 'next'
import type { Character, Location, Episode, CharacterLocation } from 'rickmortyapi/dist/interfaces'
import get from 'lodash/get'
import { getCharacter, getEpisode, getLocation } from 'rickmortyapi'
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

const fetchEpisodes = async (episodes: string[]) => {
  const ids = episodes.map((x) => Number(x.split('/').slice(-1)))
  const { data } = await getEpisode(ids)
  return data
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const { data: character } = await getCharacter(Number(id))

  const [origin, location, episodes] = await Promise.all([
    fetchLocation(character.origin),
    fetchLocation(character.location),
    fetchEpisodes(character.episode)
  ])

  return {
    props: {
      character,
      origin,
      location,
      episodes,
    },
  }
}

type Props = {
  character: Character,
  location: Location,
  origin: Location,
  episodes: Episode[],
}

const Home: NextPage<Props> = ({ character, location, origin, episodes }) => {
  // const setCharacter = useCharacterStore((state) => state.setCharacter)
  // setCharacter(data)
  // const character = useCharacterStore((state) => state.character)

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
          <div className="basis-1/3 flex justify-center">
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
          <div className="basis-1/3 flex flex-col">
            <CharacterBasic character={character} />
            <CharacterLocationInfo location={origin} title="Origin" />
            <CharacterLocationInfo location={location} title="Last Seen" />
          </div>
          <div className="basis-1/3 flex flex-col">
            <h1 className="text-3xl text-blue-400">Episodes List</h1>
            <div className="overflow-y-auto h-64">
              <ul>
                {
                  episodes.map((episode) => {
                    return (
                      <li key={episode.id}>{ episode.episode } - { episode.name } - { episode.air_date }</li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home
