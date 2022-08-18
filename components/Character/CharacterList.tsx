import type { Character } from 'rickmortyapi/dist/interfaces'

import CharacterCard from './CharacterCard'

type Props = {
  characters: Character[]
}

const CharacterList = ({ characters }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 grid-flow-row gap-4 content-center">
      {
        characters.map((character) => {
          const { id } = character
          return (
            <CharacterCard key={id} character={character} />
          )
        })
      }
    </div>
  )
}

export default CharacterList