import SignUpForm from '../Components/Forms/RegisterForm'
import { logOut } from '../firebase';
import { useEffect } from 'react';

const RegisterPage = ()=>{

    useEffect(()=>{
        logOut();
    }, []);


    return(

        <div className = 'container'>
            <SignUpForm/>
        </div>
    );
}

export default RegisterPage;