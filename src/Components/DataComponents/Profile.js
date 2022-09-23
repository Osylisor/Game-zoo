
import '../../styles/profile.css';
import { useState } from 'react';
import profileImage from '../../images/User.png';
import ProfileEditForm from '../Forms/ProfileForm';
import Modal from './Modal'

//Start by defining the user data prop!
const Profile = (props)=>{


    //#region State defination
    const [showForm, setShowForm] = useState(false);
    //#endregion


    //#region Functions

    //#endregion


    return(

        <div className = 'profile'>

            {
                showForm && 
                <Modal
                    child = {<ProfileEditForm 
                        closeForm ={()=>{setShowForm(false); props.refresh();}}
                        user = {props.user}
                       
                        />
                    } 
                />
            }


            <div className = 'head'>
                <div className = 'pic'>
                    {
                        props.user.profile_url === null?
                        <img src ={profileImage}/>:
                        <img src = {props.user.profile_url}/>
                    }
                </div>
                
            </div>

            <div className = 'body'>

                <div className='row'>
                    <p>Name:</p>
                    <p>{props.user.name}</p>
                </div>

                <div className='row'>
                    <p>Surname:</p>
                    <p>{props.user.surname}</p>
                </div>

                <div className='row'>
                    <p>Email:</p>
                    <p>{props.user.email}</p>
                </div>

                <div className='row'>
                    <p>Username:</p>
                    <p>{props.user.username}</p>
                </div>
            </div>


            <div className = 'btn-section'>
                <button onClick ={()=>{setShowForm(true);}}>Update details</button>
            </div>

        </div>
    );

}

export default Profile;