import './App.scss';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// App Context
import { AppContextProvider } from './context/appContext';
// Components
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import User from './components/pages/User';
import Footer from './components/layout/Footer';
// MUI 
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#B7D4DB",
      main: "#A5CAD2",
      dark: '#84A1A8',
      contrastText: "#333"
    },
    secondary: {
      light: "#FF94A1",
      main: "#FF7A89",
      dark: "#CC616E",
      contrastText: "#333"
    }
  },
  spacing: [0, 4, 8, 16, 32, 64]
})

function App() {
  const [user, setUser] = useState(undefined);

  const getUser = useCallback(async function() {
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          credentials: 'include',
        },
      })
      const json = await response.json();
      if(!response.ok){
        throw new Error(json.message);
      }
      console.log(json)
      setUser(json.data);
      console.log('user set')
      console.log(user);
    } catch (err) {
      setUser(undefined);
      console.log({ err });
    }
  }, [])

  useEffect(() => {
    getUser();
  }, [getUser])

  return (
    <MuiThemeProvider theme={theme}>
      <AppContextProvider>
        <Router>
          <div className="app">
            <div className="container">
              <Switch>
                {/* <Route exact path='/' component={Home} /> */}
                <Route 
                  exact 
                  path='/' 
                  render={ props => {
                    if(!user){
                      return <Redirect to='/login' />;
                    }
                    return <Home {...props} />
                  }} 
                />
                {/* <Route exact path='/signup' component={Signup} /> */}
                <Route 
                  exact 
                  path='/signup' 
                  render={ props => {
                    if(user){
                      return <Redirect to='/' />;
                    } 
                    return <SignUp getUser={getUser} updateUser={setUser} {...props} />
                  }} 
                />
                {/* <Route exact path='/login' component={Login} /> */}
                <Route 
                  exact 
                  path='/login' 
                  render={ props => {
                    if(user){
                      return <Redirect tp='/' />
                    }
                    return <Login getUser={getUser} {...props} />
                  }} 
                />
                <Route path='/users/me' component={User} />
                {/* <Route exact path='/users/:handle' component={User} /> */}
                {/* <Route path='/posts/createPost' component={User} /> */}

              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </AppContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
