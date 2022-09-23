
import '../../styles/forms.css'
import { useState } from 'react';

const DeleteForm = (props)=>{



    //#region State defination
    const [isDataLoading, setIsDataLoading] = useState(false);
    //#endregion

    //#region Functions

    const deleteGame = ()=>{

        //harasu details
        const url = 'https://oswell-game-zoo-101.hasura.app/v1/graphql';
        const admin_secret = 'rOPdM53PTKECPRvrhFTne5HVz29XZ1Rs7owJTXauS3LLvWay6fCwWAfrHFeJcAQB';
    
        //Get game's id
        const gameId = props.game.id;
        const _query = `
                
            mutation {
                delete_games_by_pk(id: ${gameId}){
                    id
                }
            }
        `;

        fetch(url, {
            method:'POST',
            headers:{
                'content-type': 'application/json',
                'x-hasura-admin-secret': admin_secret,
             
            },
            body:JSON.stringify({
                query: _query
            })
        })
        .then((response) => {
            return response.json();
        }).then((result)=>{
            console.log(result);
            props.closeForm();
        })
        

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsDataLoading(true);
        deleteGame();
    }
    //#endregion


    return(
         !isDataLoading?<div className = 'delete-form'>

            
                
            
            <span 
                className = 'close-btn'
                onClick={()=>{props.closeForm();}}>&times;
            </span>

            <div className = 'body'>
                <p>Are you sure that you would like to delete this game?</p>
            </div>


            <div className = 'btn-section'>
                <button onClick = {(e) =>{handleSubmit(e)}}>Yes</button>
                <button onClick = {()=> {props.closeForm();}}>No</button>
            </div>


        </div> : 
        <div className='delete-form'>
            <p style ={{textAlign:'center'}}>Please wait...</p>
        </div>
    );
}

export default DeleteForm;