
import '../../styles/forms.css';
import { useState } from 'react';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import MessageBox from '../DataComponents/MessageBox';




const GameForm = (props)=>{

  



    //#region State defination
    const [name, setName] = useState(props.isEditForm? props.game.name: '');
    const [gameGenre, setGameGenre] = useState(props.isEditForm? props.game.genre: '');
    const [description, setDescription]= useState(props.isEditForm? props.game.description :'');
    const [imgaeFile, setImageFile] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //#endregion


    //#region Functions

    const uploadImage = ()=>{

        if(imgaeFile === null) return;

        const storageRef = ref(storage, `games/${imgaeFile.name}`);

        uploadBytes(storageRef, imgaeFile)
        .then((snapshot)=>{

            getDownloadURL(snapshot.ref)
            .then((url)=>{

                if(props.isEditForm){
                    updateGame(url);
                    
                }else{
                    addGame(url);
                }

            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

    }

    const addGame = (imgUrl)=>{

        //harasu details
        const url = 'https://oswell-game-zoo-101.hasura.app/v1/graphql';
        const admin_secret = 'rOPdM53PTKECPRvrhFTne5HVz29XZ1Rs7owJTXauS3LLvWay6fCwWAfrHFeJcAQB';

        //Get signed in user's details
        const signedInUser = JSON.parse(localStorage.getItem('user'));
        const userID = signedInUser.uid;

        //Query
        const _query = (imgUrl === '') ?`
        
            mutation {
                insert_games_one(object: {
                    description: "${description}", 
                    genre: "${gameGenre}", 
                    name: "${name}",
                    user_id: "${userID}"
                }) {
                
                id
                name
                genre
                description
                }
            }
        ` :`


        mutation {
            insert_games_one(object: {
                description: "${description}", 
                genre: "${gameGenre}", 
                name: "${name}",
                user_id: "${userID}"
                image_url: "${imgUrl}"
            }) {
            
            id
            name
            genre
            description
            }
        }
        
        
        `;

        fetch(url, {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'x-hasura-admin-secret': admin_secret

            },
            body:JSON.stringify({
                query:_query
            })
        })
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data);
            props.closeForm();
        })

    }

    const updateGame = (imgUrl)=>{

        //harasu details
        const url = 'https://oswell-game-zoo-101.hasura.app/v1/graphql';
        const admin_secret = 'rOPdM53PTKECPRvrhFTne5HVz29XZ1Rs7owJTXauS3LLvWay6fCwWAfrHFeJcAQB';

        //Get game's id
        const gameId = props.game.id;
        const _query = (imgUrl === '')?`
        
        mutation {
            update_games_by_pk(pk_columns: {id: ${gameId}}, _set: 
                {
                    description: "${description}", 
                    genre: "${gameGenre}", 
                    name: "${name}"
            
                }) {
              name
              description
              genre
            }
          }
          
        
        `:`


        mutation {
            update_games_by_pk(pk_columns: {id: ${gameId}}, _set: 
                {
                    description: "${description}", 
                    genre: "${gameGenre}", 
                    name: "${name}"
                    image_url: "${imgUrl}"
                }) {
              name
              description
              genre
            }
          }
        
        
        `

        fetch(url,{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                'x-hasura-admin-secret': admin_secret
            },

            body:JSON.stringify({
                query: _query
            })
        })
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data);
            props.closeForm();
        })

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('Form submitted');

        //Handle validation
        const isFormEmpty = (
            name ===''||
            gameGenre === '' ||
            description === ''
        );


        if(isFormEmpty){
            setErrorMessage('None of the required fields should be empty.');
            return;
        }




        //When the user's data is validated
        setIsDataLoading(true);
        if(imgaeFile !== null){
            uploadImage();
            return;
        }

        if(props.isEditForm){
            updateGame('');
            return;
        }
        addGame('');
    }
    //#endregion

    

    return(
        <div className = 'sign-in-form'>

            {!isDataLoading &&
                        <span 
                        className = 'close-btn'
                        onClick={()=>{props.closeForm();}}>&times;</span>
            }

            {
                (errorMessage !== '') &&
                <MessageBox
                    message = {errorMessage}
                    close ={()=> {setErrorMessage('');}}
                />
            }

            {props.isEditForm? //Check if this is an edit form

                <h1 align = 'center'>Edit Details</h1>: 
                <h1 align = 'center'>Add Game</h1>
            }

            <lable htmlFor = 'name'>Name</lable>
            <input 
                value = {name}
                type = 'text' 
                id = 'name'
                onChange={(e)=> {setName(e.target.value)}}
            />


            <lable htmlFor = 'game-gen'>Game genre</lable>
            <input
                value = {gameGenre} 
                type = 'text' 
                id = 'game-gen'
                onChange={(e)=>{setGameGenre(e.target.value)}}
            />


            <label htmlFor='pic'>Picture(optional)</label>
            <input 
                type = 'file' 
                id= 'pic'
                onChange={(e)=>{setImageFile(e.target.files[0])}}
            />
            

            <lable htmlFor = 'game-desc'>Game Description</lable>
            <textarea
                value = {description}
                onChange = {(e)=>{setDescription(e.target.value)}}
                id = 'game-desc'
                style = {{fontSize:'1.2rem'}}
            >

            </textarea>

            {
                isDataLoading?
                <p style ={{textAlign:'center'}}>Please wait...</p>:
                props.isEditForm?
                <button onClick = {(e)=> handleSubmit(e)}>Update</button>:
                <button onClick = {(e)=> handleSubmit(e)}>Add Game</button>
            }

        </div>
    );
}


export default GameForm;