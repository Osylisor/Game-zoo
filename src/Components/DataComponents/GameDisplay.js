import '../../styles/forms.css';
import  '../../styles/game view.css'
import gameImage from '../../images/Game Icon.png';


const GameDisplayComponent = (props)=>{


    return(

        <div className ='game-view'>

            <span 
                className = 'close-btn'
                onClick={()=>{props.closeForm();}}>&times;
            </span>
            
            <div className = 'image'>
                {
                    props.game.image_url === null?
                    <img className = 'contain' src = {gameImage}/>:
                    <img className ='cover' src = {props.game.image_url}/>
                }
            </div>

            <div className = 'game-name'>
                <h1>{props.game.name}</h1>
            </div>

            <div className = 'game-genre'>
                <p>Genre: {props.game.genre}</p>
            </div>

            <div className = 'description'>
                <p>{props.game.description}</p>
            </div>

        </div>
    );

}

export default GameDisplayComponent;