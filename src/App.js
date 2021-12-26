import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header';
import Board from './Components/Board';
import ListDetail from './Components/ListDetail';
import SignIn from './Components/SignIn'

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
            <Route path='/signin'>
              <SignIn />
            </Route>
            <Route path='/list/:id'>
              <ListDetail />
            </Route>
          </Switch>
        </div>
      </div >
    </BrowserRouter>
  );
}

export default App;