import { Photographer } from './photographer.model'
export interface PaginatedPhotographer {
  count: number
  next: string
  previous: string
  results: Photographer[]
  timestamp: string
}
