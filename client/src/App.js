import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import PokemonCreate from './components/PokemonCreate';
import PokemonDetail from './components/PokemonDetail';
import ErrorComp from './components/ErrorComp';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route exact path = '/home' component={Home} />
        <Route exact path = '/home/:id' component={PokemonDetail} />
        <Route exact path = '/create' component={PokemonCreate} />
        <Route path = '*' component={ErrorComp} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
