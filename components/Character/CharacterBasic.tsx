import type { Character } from 'rickmortyapi/dist/interfaces'
import get from 'lodash/get'

type Props = {
  character: Character
}

const userDataList = ['name', 'status', 'species', 'type', 'gender']

const CharacterBasic = ({ character }: Props) => {
  return (
    <>
      <h1 className="text-3xl text-blue-400">Basic</h1>
      <ul>
        {
          userDataList.map((field) => {
            return (
              <li key={field} className="text-2xl capitalize">
                { field }: { get(character, field) }
              </li>
            )
          })
        }
        <li className="text-2xl">Episodes: { character.episode.length }</li>
      </ul>
    </>
  )
}

export default CharacterBasic