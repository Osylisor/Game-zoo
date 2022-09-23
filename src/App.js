
import './App.css';
import SignInPage from './Pages/SignInPage';
import SideBar from './Components/Dashboard/Dashboard';
import RegisterPage from './Pages/SignUpPage';
import GameLayout from './Pages/GamePage';
import ProfileLayout from './Pages/ProfilePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {

  
  

  return (
    
      <BrowserRouter>

        <Routes>
          <Route path ='/' element = {<SignInPage/>}/>
          <Route path = '/register' element = {<RegisterPage/>}/>

          <Route path ='/dashboard' element = {<SideBar/>}>

            <Route path = 'games' element = {<GameLayout/>}/>
            <Route path = 'profile' element = {<ProfileLayout/>}/>

          </Route>

        </Routes>

      </BrowserRouter>
    
  );
}

export default App;
