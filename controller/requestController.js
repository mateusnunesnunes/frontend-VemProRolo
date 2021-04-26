import api from './api';
class requestController{

    
    async post(endpoint,object) {
        
        const response = await api.post(endpoint,object);
        console.log(response)
        return response;

        
    }


    

}
const requests = new requestController;
export default requests;



  