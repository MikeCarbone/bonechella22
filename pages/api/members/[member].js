import {
  API_URL,
  COMMUNITY_ID
} from '../../../libs/constants'
import GETrequest from '@/libs/GETrequest';
import { GATSBY_KEY } from '@/libs/keys';

export default async function handler(req, res) {
    const { member } = req.query
    if (req.method === 'GET') {
        try {
            const data = await GETrequest({
                endpoint: `${API_URL}/api/communities/${COMMUNITY_ID}/members/${member}`,
                headers: { 'authorization': `Bearer ${GATSBY_KEY}` }
            });
            return res.status(200).json(data)
        } catch (err) {
            const msg = err?.msg ? err?.msg : 'Unable to fetch member.'
            return res.status(500).send({ msg });
        }
    } else {
        // Handle any other HTTP method
    }
}