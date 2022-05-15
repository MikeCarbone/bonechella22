import POSTrequest from './POSTrequest';
import { API_URL, COMMUNITY_ID, EVENT_ID } from '@/libs/constants';

const completeSignup = async ({ code, fields, setLoading, setError, setSuccess, defaultErr, successMessage }) => {
    try {
        setSuccess('')
        setError('')
        setLoading(true)

        const key = JSON.parse(localStorage.getItem('key'));

        const endpoint = `${API_URL}/api/communities/${COMMUNITY_ID}/events/${EVENT_ID}/complete`
        const res = await POSTrequest({
            endpoint,
            params: {
                fields,
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

        // Handle error from server here
        if (err.msg) { setError(err.msg) }
        else { setError(defaultErr);console.log(err); }
    }
}

export default completeSignup
