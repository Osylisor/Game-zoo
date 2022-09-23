import userImage from '../../images/User.png'
import  '../../styles/sidebar.css'
import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Nav from './NavBar';


//The menu button: appears only when the app is on mobile screens
const MenuButton = (props)=>{


    return(
        <div className ='menu' onClick={()=>{props.click()}}>

            <span className = 'bar'></span>
            <span className = 'bar'></span>
            <span className = 'bar'></span>

        </div>
    )

}

//The sidebar
const SideBar = (props)=>{


    //#region Ref defination
    const sideBarRef = useRef();
    //#endregion

    //#region Functions
    const showSideBar = ()=>{
        sideBarRef.current.style.width = '250px';

    }

    const closeSideBar = ()=>{
        sideBarRef.current.style.width = '0px';
    }

    const handleResize = ()=>{

        if(window.innerWidth > 600){
            sideBarRef.current.style.width =' 250px';
        }
        
        if(window.innerWidth <= 600){
            sideBarRef.current.style.width ='0px';
        }

    }
    //#endregion



    //Handling resize!
    useEffect(()=>{


        window.addEventListener('resize', handleResize);

        return ()=>{
            window.removeEventListener('resize', handleResize);
        }
    

    })


    useEffect(()=>{

        if(localStorage.getItem('user') === null){
            localStorage.setItem('globalMessage', 'Sorry, you must login first.');
            window.location.href = '/';
        }

    }, [])

    return (

        <>
            <Nav pathname = {window.location.pathname}/>
            <MenuButton click = {()=>showSideBar()} />
            
        
            <div className = 'sidebar' ref={sideBarRef}>
            

                <div className = 'close' onClick ={()=>{closeSideBar();}}>
                    <span>&times;</span>
                </div>

                <div className = 'link-section'>

                    <ul className = 'links'>

                        <li className = 'item'>
                            <a href='/dashboard/games' >Games</a>
                        </li>

                        
                        <li className = 'item'>
                            <a  href='/dashboard/profile'>Profile</a>
                        </li>

                        
                        <li className = 'item'>
                            <a  href='/'>Logout</a>
                        </li>

                    </ul>

                </div>



            </div>

            

            <div className = 'side-content'>
                <Outlet/>
                
            </div>

        </>
    );

}

export default SideBar;