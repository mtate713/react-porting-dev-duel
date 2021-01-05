import {Route, Switch, Link} from 'react-router-dom'
import Home from './screens/Home'
import Inspect from './screens/Inspect'
import Duel from './screens/Duel'
import './App.css';

function App() {
  return (
    <div className="App">

        <header>
          <div className="sectionLogo">
            <Link className= "ref"to='/'>Dev-Duel</Link>
          </div>
          <nav>
            <Link className= "ref" to='/inspect'>Inspect</Link>
            <Link className= "ref" to='/duel'>Duel</Link>
          </nav>
        </header>

      <Switch>
        <Route path ='/inspect' component = {Inspect}/>
        <Route path ='/duel' component = {Duel}/>
        <Route path ='/' component = {Home}/>
      </Switch>
        
        
      
      
    </div>
      
    
  );
}

export default App;
