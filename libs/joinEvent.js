import POSTrequest from './POSTrequest';
import { COMMUNITY_ID, EVENT_ID, API_URL } from '@/libs/constants';

const joinEvent = async ({ code, setLoading, setError, setSuccess, defaultErr, successMessage }) => {
    try {
        setSuccess('')
        setError('')
        setLoading(true)

        const key = JSON.parse(localStorage.getItem('key'));

        const endpoint = `${API_URL}/api/communities/${COMMUNITY_ID}/events/${EVENT_ID}`
        const res = await POSTrequest({
            endpoint,
            params: {
                authorization: {
                    token: key,
                    code
                }
            }
        })

        setLoading(false)
        setSuccess(successMessage)

        return res
    } catch (err) {
        setLoading(false)
        const errMsg = err?.msg ? err?.msg : defaultErr
        setError(errMsg)
        return Promise.reject(errMsg)
    }
}

export default joinEvent
