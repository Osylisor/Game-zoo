import  '../../styles/forms.css'
import { useState , useEffect} from 'react';
import { registerUser } from '../../firebase';
import MessageBox from '../DataComponents/MessageBox';

const SignUpForm = ()=>{

     //#region state defination
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [name, setName] = useState('');
     const [surname, setSurname] = useState('');
     const [username, setUsername] = useState('');
     const [disabled, setDisabled] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');
     //#endregion
 
 
     //#region functions
 
     const handleSubmit = (e)=>{
         e.preventDefault();

         if(localStorage.getItem('globalMessage') !== null){
            localStorage.removeItem('globalMessage');
         }
         //Validate the user's data
         const isFormEmpty = (
            email === '' ||
            password ==='' ||
            name === '' ||
            surname === '' ||
            username === '');

        
            if(isFormEmpty){
                setErrorMessage('None of the fields should be empty.');
                return;
            }


         //When the data provided is valid
         console.log('Form submitted');
         setDisabled(true);
         registerUser(email, password, name, surname, username);
     }
 
     //#endregion

     useEffect(()=>{

        if(localStorage.getItem('globalMessage') !== null){
            const error = localStorage.getItem('globalMessage');
            setErrorMessage(error);
        }
        
    }, []);


    return (
        <div className = 'sign-in-form'>

            <h1 align ='center'>Sign up</h1>

            {(errorMessage !== '') &&
                <MessageBox
                    message = {errorMessage}
                    close = {()=>{ localStorage.clear(); setErrorMessage('');}}
                />
            }

            <label htmlFor="email">Email</label>
            <input 
                value ={email} 
                type ='email' id="email" 
                onChange={(e) =>setEmail(e.target.value)}
            />
            
            <label htmlFor="name">Name</label>
            <input 
                value ={name} 
                type ='text' 
                id="name"
                onChange={(e)=>{setName(e.target.value)}}
            />

            <label htmlFor="surname">Surname</label>
            <input 
                value = {surname} 
                type ='text' 
                id="email"
                onChange = {(e) =>setSurname(e.target.value)}
            />

            
            <label htmlFor="username">Username</label>
            <input 
                value = {username} 
                type ='text' 
                id="email"
                onChange={(e)=> setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input 
                value = {password} 
                type = 'password' 
                id = "password"
                onChange={(e)=> setPassword(e.target.value)}

            />

           


            {!disabled?
                <button  onClick={(e) => handleSubmit(e)}>Sign up</button>:
                <p style={{textAlign: 'center'}}>Please wait...</p>
            }
            <p style ={{textAlign:'center'}}>Already have an account? <a href='/'>Click here</a> to sign in</p>

        </div>
    )

}


export default SignUpForm;