import axios from 'axios';

export async function readByUserId(userId, types) {
  const { data } = await axios.get(`api/offers-by/${userId}?types=${types}`);
  return data;
}
