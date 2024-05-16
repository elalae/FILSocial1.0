import axios from 'axios'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}
export const generateImage = async (prompt) => {
    try {
   
        console.log("API Key for request:", process.env.REACT_APP_OPENAI_API_KEY);

        const headers = {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        };

        const data = {
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        };

        const response = await axios.post('https://api.openai.com/v1/images/generations', data, { headers });
        return response.data;
    } catch (error) {
        console.error('Failed to generate image:', error.response ? error.response.data : error);
        throw error;
    }
}

