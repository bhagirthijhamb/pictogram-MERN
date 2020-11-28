import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import User from './components/pages/User';

function App() {
  return (
    <Router>
      <Navbar />
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/users/:handle' component={User} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
