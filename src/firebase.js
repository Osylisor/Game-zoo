import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword, signOut} from 'firebase/auth'

import {getStorage} from 'firebase/storage'



// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBHph0kLFdOPmiDwq39TG9zxmG2hYorCos",
  authDomain: "game-zoo-hasura.firebaseapp.com",
  projectId: "game-zoo-hasura",
  storageBucket: "game-zoo-hasura.appspot.com",
  messagingSenderId: "938195378916",
  appId: "1:938195378916:web:b84f4ac91705ef1f3f82f1"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const auth = getAuth(app);

//Signup users
export const registerUser = async(email, password, name, surname, username)=>{




try{
    //Create the user...
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;


    const url = 'https://oswell-game-zoo-101.hasura.app/v1/graphql';
    const admin_secret = 'rOPdM53PTKECPRvrhFTne5HVz29XZ1Rs7owJTXauS3LLvWay6fCwWAfrHFeJcAQB';
    const _query =`
    
    mutation{
        insert_user_one(
            object: 
            {
                id :"${user.uid}", 
                email:"${user.email}", 
                name:"${name}",
                surname: "${surname}",
                username:"${username}"
            }){  
          id
          email
          name
        }
      }
    
    `;

    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            "x-hasura-admin-secret": admin_secret
        },
        body:JSON.stringify({
            query: _query
        })
    }).then(response => {response.json()})
    .then((data)=> {
        console.log(data)
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/dashboard/games';
    
    })
    .catch((error)=>{
        console.log(error.code, ':', error.message);
        
    })

    
   

}catch(err){
    console.log(err);
    //alert('Something went wrong!');
    localStorage.setItem('globalMessage', 'Please try using another email.')
    window.location.href = '/register';
}

    

}

//Signin users
export const signInUser = async(email, password)=>{

    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCred)=>{
            const user = userCred.user;
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/dashboard/games'
        }).catch((error)=> {
            console.log(error.code, error.message);
            //alert('Wrong email or password');
            localStorage.setItem('globalMessage', 'Wrong email or password')
            window.location.href = '/';
        });
   
}

//logout
export const logOut = ()=>{
    if(localStorage.getItem('user') !== null) localStorage.removeItem('user');
    signOut(auth);
}
