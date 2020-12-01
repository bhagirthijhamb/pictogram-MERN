import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// App Context
import { AppContextProvider } from './context/appContext';
// Components
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import User from './components/pages/User';
// MUI 
import { MuiThemeProvider } from '@material-ui/core/styles';
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
      <AppContextProvider>
        <Router>
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route path='/users/me' component={User} />
              {/* <Route exact path='/users/:handle' component={User} /> */}
              {/* <Route path='/posts/createPost' component={User} /> */}

            </Switch>
          </div>
        </Router>
      </AppContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
