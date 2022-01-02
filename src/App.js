import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header';
import Board from './Components/Board';
import ListDetail from './Components/ListDetail';
import SignIn from './Components/SignIn'
import ArticleForm from './Components/ArticleForm';
import SignInComplete from './Components/SignInComplete';
import ProfilePage from './Components/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          <Header />
          <Switch>
            <Route exact path='/'>
              <Board />
            </Route>
            <Route path='/list/:id'>
              <ListDetail />
            </Route>
            <Route path='/articleForm'>
              <ArticleForm />
            </Route>
            <Route path='/profile'>
              <ProfilePage />
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