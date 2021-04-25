import {User} from '../../model/types/user';
import requests from '../requestController';

class LoginValidation{

    btnValidation = (email,password) =>{
        console.log(email,password);
        if(email && password){
            let object = {
                email: "admin@gmail.com",
                password: "1Administrador"
            }
            requests.get("users/auth",object)
        }
        return false;
    }

}
const loginValidation = new LoginValidation;
export default loginValidation;


  