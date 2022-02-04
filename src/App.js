import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './Pages/Header';
import Board from './Pages/Board';
import ListDetail from './Pages/ListDetail';
import SignIn from './Pages/SignIn'
import ArticleForm from './Pages/ArticleForm';
import SignInComplete from './Pages/SignInComplete';
import MyProfilePage from './Pages/MyProfilePage';
import YourProfilePage from './Pages/YourProfilePage'
import EditArticle from './Pages/EditArticle';
import LandingCom from './Components/LandingCom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          <Header />
          <LandingCom />
          <Switch>
            <Route exact path='/'>
              <Board />
            </Route>
            <Route path='/board/:id/'>
              <ListDetail />
            </Route>
            <Route path='/articleForm'>
              <ArticleForm />
            </Route>
            <Route path='/myprofile'>
              <MyProfilePage />
            </Route>
            <Route path='/yourprofile'>
              <YourProfilePage />
            </Route>
            <Route path='/editarticle/:id'>
              <EditArticle />
            </Route>
            <Route path='/signin'>
              <SignIn />
            </Route>
            <Route path='/signinComplete'>
              <SignInComplete />
            </Route>
          </Switch>
        </div>
      </div >
    </BrowserRouter>
  );
}

export default App;