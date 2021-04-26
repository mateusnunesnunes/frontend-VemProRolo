import {User} from '../../model/types/user';
import requests from '../requestController';

class LoginValidation{

    async btnValidation = (email,password) =>{
        console.log(email,password);
        if(true){
            let object = {
                email: "admin@gmail.com",
                password: "1Administrador"
            }
            let response = await requests.post("users/auth",object);
            console.log("BUCETA ",response)
            
        }
        return false;
    }

}
const loginValidation = new LoginValidation;
export default loginValidation;


  