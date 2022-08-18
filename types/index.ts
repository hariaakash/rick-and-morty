import type { Character } from 'rickmortyapi/dist/interfaces'

export type Info = {
  /** The length of the response */
  count: number;
  /** The amount of pages */
  pages: number;
  /** Link to the next page (if it exists) */
  next: string | null;
  /** Link to the previous page (if it exists) */
  prev: string | null;
}

export type ApiData = {
  info: Info,
  results: Character[],
}

export type Pagination = {
  page: number,
  pages: number,
  total: number,
}