
import '../../styles/message-box.css'

const MessageBox = (props)=>{

    return(

    <div className = 'message-box'>
        <span onClick = {()=>{props.close();}}className = 'close-button'>&times;</span>
        <p className = 'content'>{props.message}</p>
    </div>
    )

}

export default MessageBox;