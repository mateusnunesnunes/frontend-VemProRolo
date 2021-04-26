import requests from '../requestController';

class RegisterValidation{

    btnValidation = async (name:any,email: any,password: any): Promise<boolean> =>{
        console.log(name, email, password);
        if(name && email && password){
            let object = {
                name: name,
                email: email,
                password: password
            }
            let res;
            try{
                console.log("try")
                res = (await requests.post("users", object)).status
                console.log(res)
            } catch(error) {
                console.error(error)
                return false;
            }
            return res == 201
        }
        return false;
    }

}
const registerValidation = new RegisterValidation;
export default registerValidation;


  