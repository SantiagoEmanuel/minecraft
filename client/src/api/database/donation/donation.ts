import { fetch } from '../db-connection'

export const getDonations = async () => {
  return await fetch.get('/donations')
}
