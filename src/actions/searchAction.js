import axios from 'axios';
import { object } from 'prop-types';

export default(data)=>{

    const searchUrl = `${window.apiHost}/tools?q=${data}`
    const axiosResponse = axios.get(searchUrl,data);
    // console.log(axiosResponse)
    // Waiting. Waiting. Waiting. (via redux-promise - our middleware)
    return {
        type:"search",
        payload: axiosResponse
    }
}