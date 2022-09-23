
import { useEffect, useState } from 'react';
import  '../../styles/forms.css'
import MessageBox from '../DataComponents/MessageBox';

import { signInUser } from '../../firebase';

const SignInForm = ()=>{

    //#region state defination

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    //#endregion


    //#region functions

    const handleSubmit = (e)=>{
        e.preventDefault();


         //Remove the global message 
         if(localStorage.getItem('globalMessage') !== null){
            localStorage.removeItem('globalMessage')
        }

        //Handle validations
        if(email === '' || password === ''){
            setErrorMessage('None of the fields should be empty.');
            return;
        }



        //When the data is valid
        setIsDataLoading(true);

       

        console.log('Form submitted');
        signInUser(email, password);
    }

    //#endregion

    useEffect(()=>{

        if(localStorage.getItem('globalMessage') !== null){
            const error = localStorage.getItem('globalMessage');
            setErrorMessage(error);
        }
        
    }, []);

    return(
        <form className = 'sign-in-form'>

            <h1 align ='center'>Sign in</h1>
            {(errorMessage !== '') &&
                <MessageBox 
                    message = {errorMessage}
                    close = {()=>{
                        localStorage.clear();
                        setErrorMessage('');
                }}
                />
            }

            <label htmlFor="email">Email</label>
            <input 
                value ={email} 
                type ='email' 
                id="email"
                onChange={(e) => {setEmail(e.target.value)}}
            />

            <label htmlFor="password">Password</label>
            <input 
                value ={password}
                type = 'password' 
                id = "password"
                onChange={(e)=> {setPassword(e.target.value)}}
            />


            {!isDataLoading?
                <button onClick={(e) => handleSubmit(e)}>Sign in</button>:
                <p style ={{textAlign:'center'}}>Please wait...</p>
            }

            <p style ={{textAlign:'center'}}>No account? <a href='/register'>Click here</a> to sign up</p>

        </form>
    )

}

export default SignInForm;