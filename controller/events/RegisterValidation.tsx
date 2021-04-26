import requests from '../requestController';

class RegisterValidation{

    btnValidation = async (name:any,email: any,password: any) =>{
        if(name && email && password){
            let object = {
                name: name,
                email: email,
                password: password
            }
            let res;
            await requests.post("users",object)
            .then((response) => {
                res = response.status;
            }).catch((error) => {
                res = error.response.status;
            })
            return res == 201
        }
        return false;
    }

}
const registerValidation = new RegisterValidation;
export default registerValidation;


  