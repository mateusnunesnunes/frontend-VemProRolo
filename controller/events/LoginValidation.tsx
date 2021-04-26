import {User} from '../../model/types/user';
import requests from '../requestController';

class LoginValidation{

    btnValidation = async (email: any,password: any) =>{
        console.log("CHEGUEI")
        if(email && password){
            let object = {
                email: email,
                password: password
            }
            let res;
            await requests.post("users/auth",object)
            .then((response) => {
                res = response.status;
            }).catch((error) => {
                res = error.response.status;
            })
            console.log("res ",res)
            console.log("res == 201",res == 201)
            return res == 201
        }
        return false;
    }

}
const loginValidation = new LoginValidation;
export default loginValidation;


  