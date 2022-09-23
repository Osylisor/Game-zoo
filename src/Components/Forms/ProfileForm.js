import '../../styles/forms.css'
import { useState } from 'react';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import MessageBox from '../../Components/DataComponents/MessageBox';

let downloadedUrl =''
const ProfileEditForm = (props)=>{


    //#region State defination
    const [name, setName] = useState(props.user.name);
    const [surname, setSurname] = useState(props.user.surname);
    const [username, setUsername] = useState(props.user.username);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
   
    //#endregion

    //#region Functions

    const uplodadImage = ()=>{

       
        if(file === null) return;
        const storageRef = ref(storage, `profiles/${file.name}`);
        uploadBytes(storageRef, file)
        .then((snapshot)=>{

            getDownloadURL(snapshot.ref).then((url)=>{
                downloadedUrl = url
                updateUserDetails();
            }).catch((err)=> console.log(err));

        }).catch((err)=>{console.log(err)})
        
       

    }

    const updateUserDetails = ()=>{
         //Requests for hasura
         const url = 'https://oswell-game-zoo-101.hasura.app/v1/graphql';
         const admin_secret = 'rOPdM53PTKECPRvrhFTne5HVz29XZ1Rs7owJTXauS3LLvWay6fCwWAfrHFeJcAQB';
 
         //Get signed in user's details
         const signedInUser = JSON.parse(localStorage.getItem('user'));
         const userID = signedInUser.uid;

         
        //Upload the image if the file part is not empty
        
         //#region Update query


        console.log(downloadedUrl);

        
         const query = (file === null)?`

         mutation  {
            update_user_by_pk(pk_columns: {id: "${userID}"}, 
            _set: {
                name: "${name}", 
                surname: "${surname}", 
                username: "${username}"
        
            }){
              name
              surname
              username
            }
          }

         `:
         `
         mutation  {
            update_user_by_pk(pk_columns: {id: "${userID}"}, 
            _set: {
                name: "${name}", 
                surname: "${surname}", 
                username: "${username}"
                profile_url: "${downloadedUrl}"

        
            }){
              name
              surname
              username
            }
          }
         
         
         `;
         //#endregion

         fetch(url,{
            method:'POST',
            headers:{
                'content-type': 'application/json',
                'x-hasura-admin-secret': admin_secret
            },
            body:JSON.stringify({
                query: query
            })
         })
         .then((response)=>response.json())
         .then((result) => {
        
            props.closeForm();
        
         })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        //validate user's data
        const isFormEmpty = (
            name === ''||
            surname === ''||
            username === ''
        );

        if(isFormEmpty){
            setErrorMessage('None of the required fields should be empty.');
            return;
        }


        //When the user's data is validated...
        setIsDataLoading(true);
        if(file){
            uplodadImage();
            return;
        } 
        updateUserDetails();

    }
    //#endregion

    return(
        <div className="sign-in-form">

            {!isDataLoading &&
                <span 
                    className = 'close-btn'
                    onClick={()=>{props.closeForm();}}>&times;
                </span>
            }

            {
                (errorMessage !== '') &&
                <MessageBox
                    message = {errorMessage}
                    close = {()=>{setErrorMessage('')}}
                />
            }

            <h1>Update details</h1>

            <lable htmlFor = 'name'>Name</lable>
            <input 
                value={name}
                type = 'text' 
                id ='name'
                onChange={(e)=> setName(e.target.value)} 
            />

            <lable htmlFor = 'surname'>Surname</lable>
            <input
                value = {surname} 
                type = 'text' 
                id ='surname'
                onChange={(e)=> {setSurname(e.target.value)}} 
            />

            <lable htmlFor = 'username'>Username</lable>
            <input
                value = {username} 
                type = 'text' 
                id ='username'
                onChange={(e)=> {setUsername(e.target.value)}} 
            />

    
            <lable htmlFor = 'profile'>Profile Picture - optional</lable>
            <input 
                type = 'file' 
                id ='profile' 
                onChange={(e)=>{setFile(e.target.files[0]);}}
            />

            {!isDataLoading?
                <button onClick={(e)=>{ handleSubmit(e);}}>Update</button>:
                <p style ={{textAlign:'center'}}>Please wait...</p>
            }

        </div>
    );
}

export default ProfileEditForm;