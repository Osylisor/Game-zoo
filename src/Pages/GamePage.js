
import Card from '../Components/DataComponents/GameCard';
import { useEffect, useState } from 'react';
import GameForm from '../Components/Forms/EditForm';
import Modal from '../Components/DataComponents/Modal';
import DeleteForm from '../Components/Forms/DeleteForm';
import GameDisplayComponent from '../Components/DataComponents/GameDisplay';




const GameLayout = ()=>{

    //#region State defination
    const [showForm, setShowForm] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [games, setGames] = useState([]);
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(false);
   
    //#endregion

    //#region Functions
    const showAddForm = ()=>{
        setShowForm(true);
        setIsEditForm(false);
    }

    const displayEditForm = (game)=>{
        setShowForm(true);
        setIsEditForm(true);
        setGame(game)

    }

    const displayDeleteForm = (game)=>{
        setShowDeleteModal(true);
        setGame(game)
    }

    const dislayGameView = (game)=>{

        setShowViewModal(true);
        setGame(game);
    }

    const loadGames = ()=>{

        setLoading(true);
        
        //Requests for hasura
        const url = 'https://oswell-game-zoo-101.hasura.app/v1/graphql';
        const admin_secret = 'rOPdM53PTKECPRvrhFTne5HVz29XZ1Rs7owJTXauS3LLvWay6fCwWAfrHFeJcAQB';

        //Get signed in user's details
        const signedInUser = JSON.parse(localStorage.getItem('user'));
        const userID = signedInUser.uid;

        //Query
        const query =`
        query{
            user_by_pk(id: "${userID}"){
              games{
                id
                name
                genre
                image_url
                description
              }
            }
          }
        
        `;


        fetch(url, {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                 "x-hasura-admin-secret": admin_secret
            },
            body:JSON.stringify({
                query: query
            })
        })
        .then((response) => response.json())
        .then((result)=>{
            setGames(result.data.user_by_pk.games);
            setLoading(false);
        })

        
    }
    //#endregion

    useEffect(()=>{

        if(localStorage.getItem('user') === null){
            localStorage.setItem('globalMessage', 'Sorry, you must login first.');
            window.location.href = '/';
        }

        loadGames();

    }, []);


   
 
    return(

        <div className = 'container-lower'>

            { //Show the form when the add button is clicked 
                showForm &&
                <Modal 
                    child = {<GameForm
                        closeForm = {()=>{setShowForm(false); loadGames();}}
                        isEditForm = {isEditForm} 
                        game = {game}
                    />}
                />
            }

            {
                //Show the delete form 
                showDeleteModal &&
                <Modal
                    child ={<DeleteForm
                        closeForm = {()=>{setShowDeleteModal(false); loadGames();}}
                        game = {game}
                    />}
                />

            }

            {
                showViewModal &&
                //Show the game view
                <Modal
                    child = {<GameDisplayComponent
                        closeForm = {()=>{setShowViewModal(false);}}
                        game = {game}
                    />}
                
                />

            }

            {// Main content
            
                (loading)?
                <p 
                style={{
                    zIndex: '5', 
                    marginTop: '25%',
                    fontSize:'1.2rem'
                 }
                }>
                    Loading...
                </p>:
                (games.length === 0)?
                <p style={{
                    zIndex: '5', 
                    marginTop: '25%',
                    fontSize:'1.2rem',
                    textAlign:'center'
                 }
                }>
                    You have not added a game, click on 'Add Game' to add one.
                </p>:
                games.map((game)=>{
                    return <Card 
                        game = {game}
                        deleteGame = {()=>displayDeleteForm(game)}
                        editDetails = {()=>displayEditForm(game)}
                        viewDetails = {()=> dislayGameView(game)}
                    />
                })
            }


            


            <button onClick={showAddForm} className = 'add-btn'>Add Game</button>
        </div>
    );
}

export default GameLayout;