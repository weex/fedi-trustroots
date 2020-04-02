import axios from 'axios';

/**
 * API request: read user offer
 * @param {int} userId - id of user
 * @returns Promise<Offer[]> - array of the found offers
 */
export async function getOffers(userId, types) {
  try {
    const { data } = await axios.get(`api/offers-by/${userId}`, {
      params: { types },
    });
    return data;
  } catch (e) {
    /*
     * @TODO i'd expect the api to work as follows:
     * GET /api/users/userId/offers?types=host
     * (the request url is arbitrary, so /api/offers-by/userId is fine, too)
     * and return 404 when user not found
     * but [] when user exists but has no host offers
     */
    if (e?.response?.status === 404) {
      return [];
    } else {
      throw e;
    }
  }
}

export async function create(data) {
  await axios.post('api/offers', data);
}

export async function update(offerId, data) {
  await axios.put(`api/offers/${offerId}`, data);
}
