const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";
import handleToken from './token';

export default {
    makeRequest: async function(path, method, data) {
        const token = handleToken.grabToken();
        const defaultHeaders = {
            'Content-Type': 'application/json'
        }
        if (token){
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
        const options = {
            method,
            headers: defaultHeaders
        }
        if (data) {
            options.body = JSON.stringify(data);
        }
        const response = await fetch(BASE_URL + path, options);
        const responseData = await response.json();
        return responseData;
    }

}