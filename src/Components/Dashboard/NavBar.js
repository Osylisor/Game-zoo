
import '../../styles/navbar.css'




const Nav = (props)=>{



    return(

        <div className = 'navbar'>

            {props.pathname === '/dashboard/games'?

                <h1>Games</h1>:
                <h1>Profile</h1>
            }

        </div>
    );

}

export default Nav;