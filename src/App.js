import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header';
import Board from './Components/Board';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          <Header />
          <Switch>
            <Route>
              <Board />
            </Route>
            <Route>

            </Route>
          </Switch>
        </div>
      </div >
    </BrowserRouter>
  );
}

export default App;