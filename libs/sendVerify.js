import POSTrequest from './POSTrequest';
import { API_URL } from '@/libs/constants';


const sendVerify = async ({ phone, setLoading, setError, setSuccess, defaultErr, successMessage }) => {
    try {
        setSuccess('')
        setError('')
        setLoading(true)

        localStorage.setItem('key', '')

        // We want to use the public route here so the rate limiting is accurate per user
        const endpoint = `${API_URL}/api/user/verify`
        const res = await POSTrequest({ endpoint, params: { phone } })

        if (res.token) {
            localStorage.setItem('key', JSON.stringify(res.token))
        }

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

export default sendVerify
