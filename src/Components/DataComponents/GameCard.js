
import gameImage from '../../images/Game Icon.png';
import '../../styles/card.css'

const Card = (props)=>{


    //#region Functions


    //endregion


    return(
        <div className = 'card'>

            <div className = 'game-image'>

                {
                    props.game.image_url === '""' || props.game.image_url === null?
                    <img className = 'img-contain' src = {gameImage}/>:
                    <img className = 'img-cover'src = {props.game.image_url}/>
                }
                
            </div>

            <div className = 'game-title'>
                <h1>{props.game.name}</h1>
            </div>

            <div className = 'game-desciption'>
                <p>{props.game.description}</p>
            </div>

            <div className = 'button-section'>
                <button onClick = {()=>{props.viewDetails();}} className = 'view-btn'>View</button>
                <button onClick = {()=> {props.editDetails();}} className = 'edit-btn'>Edit</button>
                <button onClick = {()=>{props.deleteGame();}} className = 'remove-btn'>Remove</button>
            </div>

        </div>
    )
}

export default Card;