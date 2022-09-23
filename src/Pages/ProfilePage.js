
import Profile from '../Components/DataComponents/Profile';
import { useEffect, useState} from 'react';



const ProfileLayout = ()=>{



    //#region State defination

    const [user, setUser] = useState(null);

    //#endregion


    //#region Functions

    const getUserDetails = ()=>{

        setUser(null);

        //Requests for hasura
        const url = 'https://oswell-game-zoo-101.hasura.app/v1/graphql';
        const admin_secret = 'rOPdM53PTKECPRvrhFTne5HVz29XZ1Rs7owJTXauS3LLvWay6fCwWAfrHFeJcAQB';

        //Get signed in user's details
        const signedInUser = JSON.parse(localStorage.getItem('user'));
        const userID = signedInUser.uid;

        //Query the data
        const query = `
        
        query{
            user_by_pk(id:"${userID}"){
              name
              surname
              username
              email
              profile_url
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
            setUser(result.data.user_by_pk);
        })
    }
    //#endregion

    useEffect(()=>{

        if(localStorage.getItem('user') === null){
            localStorage.setItem('globalMessage', 'Sorry, you must login first.');
            window.location.href = '/';
        }

        getUserDetails();
    
    }, [])

    return(

        <div className = 'container'>
            {user?
            <Profile user = {user} refresh = {()=>{getUserDetails()}}/>:
            <p style={{textAlign:'center', fontSize:'1.2rem'}}>Loading...</p>
            }
        </div>
    );
}

export default ProfileLayout;