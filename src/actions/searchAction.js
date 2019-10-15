import axios from 'axios';
import { object } from 'prop-types';

export default async (query)=>{

    const searchUrl = `${window.apiHost}/tools?q=${query}`
    const {msg, data} = await axios.get(searchUrl);
    // Waiting. Waiting. Waiting. (via redux-promise - our middleware)
    return {
        type:"search",
        payload: {msg, data}
    }
}