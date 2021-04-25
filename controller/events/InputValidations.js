class InputValidations{

    validatePassword = (text) =>{
        let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if(reg.test(text) === false) {
            return false;
        }
        return text
        

    }

    validateEmail = (text) =>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            return false;
        }
        return text;
        
    }
}
const inptValidations = new InputValidations;
export default inptValidations;


  