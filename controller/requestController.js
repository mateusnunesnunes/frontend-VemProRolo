import axios from 'axios';
import api from './api';
class requestController{

    async post(endpoint,object) {
        let response = await api.post(endpoint,object)
        console.log("RESPOSTA", response)
        return response
    }

}
const requests = new requestController;
export default requests;



  