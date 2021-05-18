import {User} from '../../model/types/user';
import requests from '../requestController';

class LoginValidation{

    btnValidation = async (email: any,password: any) =>{
        if(email && password){
            let object = {
                email: email,
                password: password
            }
            let res;
            return await requests.post("auth/login",object);
        }
        return false;
    }

}
const loginValidation = new LoginValidation;
export default loginValidation;


  