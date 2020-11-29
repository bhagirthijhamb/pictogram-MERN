import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import User from './components/pages/User';
// MUI 
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: "#f2ebe5",
      main: "#A5CAD2",
      contrastText: "#333"
    },
    secondary: {
      main: "#FF7A89",
      contrastText: "#333"
    }
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
      <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/users/:handle' component={User} />
          </Switch>
        </div>
    </Router>
    </MuiThemeProvider>
  );
}

export default App;
