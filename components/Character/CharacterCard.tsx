import type { Character } from 'rickmortyapi/dist/interfaces'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  character: Character
}

const CharactersList = ({ character }: Props) => {
  const { id, name, image, gender, species } = character
  return (
    <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <Image className="mb-3 w-24 h-24 rounded-full shadow-lg" src={image} alt="Bonnie image" width="100" height="100" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{ name }</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{ species + ', ' + gender }</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <Link href={`/character/${id}`}>
            <button className="px-5 py-2.5 font-medium bg-red-50 hover:bg-red-100 hover:text-red-600 text-red-500 rounded-lg text-sm">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CharactersList