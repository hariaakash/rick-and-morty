import type { Character } from 'rickmortyapi/dist/interfaces'

import create from "zustand"

type CharacterState = {
  character: Character | null,
  setCharacter: (character: Character) => void
}

const useCharacterStore = create<CharacterState>((set) => ({
  character: null,
  setCharacter: (character) => set({ character }),
}))

export default useCharacterStore