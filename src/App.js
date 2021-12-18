import { BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          <Header />
          <Switch>

          </Switch>
        </div>
      </div >
    </BrowserRouter>
  );
}

export default App;