import api from './api';
class requestController{


    get(endpoint,object){
        
        api.get(endpoint,{
            params: object
        })
        .then((response) => console.log(response.data))
        .catch((err) => {
            console.log("ops! ocorreu um erro" + err);
        });
    }


    //const response = await api.post("posts", {image, title, content });

    //api.delete('files', { id });

    //const personUpdated = await api.put(`person/${person.id}`, { name: "Thiago" });

}
const requests = new requestController;
export default requests;



  