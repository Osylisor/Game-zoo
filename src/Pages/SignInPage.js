
import SignInForm from '../Components/Forms/LogInForm';
import { logOut } from '../firebase';
import {useEffect} from 'react'

const SignInPage = ()=>{

    useEffect(()=>{
        
        logOut();

    }, []);
   

    return(
        <div className = 'container'>
            <SignInForm/>
        </div>
    )

}

export default SignInPage;