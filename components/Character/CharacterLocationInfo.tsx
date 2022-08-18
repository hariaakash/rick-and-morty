import type { Location } from 'rickmortyapi/dist/interfaces'
import get from 'lodash/get'

type Props = {
  title: string,
  location: Location | undefined,
}

const userLocationDataList = ['name', 'type', 'dimension']

const CharacterLocationInfo = ({ title, location }: Props) => {
  if (location) {
    return (
      <>
        <h1 className="text-3xl text-blue-400 pt-4">{ title }</h1>
        <ul>
          {
            userLocationDataList.map((field) => {
              return (
                <li key={field} className="text-2xl capitalize">
                  { field }: { get(location, field) }
                </li>
              )
            })
          }
          <li className="text-2xl capitalize">Residents: { location.residents.length }</li>
        </ul>
      </>
    )
  }

  return (
    <h1 className="text-3xl text-blue-400 capitalize pt-4">{ title }: Unknown</h1>
  )
}

export default CharacterLocationInfo