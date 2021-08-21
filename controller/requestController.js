import axios from 'axios';
import api from './api';
import apiTest from './apiTest';
class requestController{

    async post(endpoint,object) {
        let response = await api.post(endpoint,object)
        return response
    }

    async get(endpoint) {
        console.log("apiTest "+endpoint);
        let response = await apiTest.get(endpoint)
        console.log("RESPOSTA", response)
        return response
    }


}
const requests = new requestController;
export default requests;



  