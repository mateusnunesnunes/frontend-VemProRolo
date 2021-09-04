import requests from '../requestController';

class RegisterValidation{

    btnValidation = async (name:any, email: any, phone: any,password: any): Promise<boolean> =>{
        console.log(name, email, password);
        if(name && email && password){
            let object = {
                name: name,
                email: email,
                phone: phone,
                password: password
            }
            let res;
            try{
                console.log("try")
                res = (await requests.post("auth/register", object)).status
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


  