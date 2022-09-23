import '../../styles/modal.css'

const Modal = (props)=>{




    return(

        <div className = 'modal'>

            <div className = 'child'>
                {props.child}
            </div>

        </div>

    )
}

export default Modal;