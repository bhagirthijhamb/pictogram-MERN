import './App.scss';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
// App Context
import { AppContextProvider } from './context/appContext';
// Components
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Footer from './components/layout/Footer';
import User from './components/profile/User';
import OtherUser from './components/profile/OtherUser';
import Navbar from './components/layout/Navbar';
import SubscribedUserPosts from './components/pages/SubscribedUserPosts';
import EditUser from './components/profile/EditUser';
import PostList from './components/post/PostList';
import Logout from './components/pages/Logout';

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

const Routing = (props) => {
  const history = useHistory();
  const { user, getUser, setUser } = props;
  useEffect(() => {
    if(user){
      history.push('/');
    } else{
      history.push('/login');
    }
  },[user])

  return(
    <Switch>
      {/* <Route exact path='/' component={Home} /> */}
      <Route exact path='/' >
        <Home user={user} {...props}>
          <PostList />
        </Home>
      </Route>
      {/* <Route exact path='/signup' component={Signup} /> */}
      <Route exact path='/signup'>
        <SignUp getUser={getUser} updateUser={setUser} {...props} />
      </Route>
      {/* <Route exact path='/login' component={Login} /> */}
      <Route exact path='/login'> 
        <Login getUser={getUser} {...props} />
      </Route>
      <Route exact path='/user' component={User} />
      <Route exact path='/user/:userId' component={OtherUser} />
      <Route path='/subscribedPosts' component={SubscribedUserPosts} />
      <Route exact path='/editProfile' component={EditUser} />
      <Route path='/logout' component={Logout} />
    </Switch>
  )
}

function App() {
  const [user, setUser] = useState(undefined);
  // console.log(user)

  // useCallback() Returns a memoized callback.

 //Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

  // useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
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
      // console.log(json)
      setUser(json.data);
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
            {user && <Navbar updateUser={setUser} />}
            <Routing user={user} setUser={setUser} getUser={getUser} />
            {/* <div className="container"> */}
              {/* <Switch> */}
                {/* <Route exact path='/' component={Home} /> */}
                {/* <Route exact path='/' 
                  render={ props => {
                    if(!user){
                      return <Redirect to='/login' />;
                    }
                    return <Home user={user} {...props}>
                      <PostList />
                    </Home>
                  }} 
                /> */}
                {/* <Route exact path='/signup' component={Signup} /> */}
                {/* <Route exact path='/signup' 
                  render={ props => {
                    if(user){
                      return <Redirect to='/' />;
                    } 
                    return <SignUp getUser={getUser} updateUser={setUser} {...props} />
                  }} 
                /> */}
                {/* <Route exact path='/login' component={Login} /> */}
                {/* <Route exact path='/login' 
                  render={ props => {
                    if(user){
                      return <Redirect to='/' />
                    }
                    return <Login getUser={getUser} {...props} />
                  }} 
                /> */}
                {/* <Route exact path='/user' component={User} />
                <Route exact path='/user/:userId' component={OtherUser} />
                <Route path='/subscribedPosts' component={SubscribedUserPosts} />
                <Route exact path='/editProfile' component={EditUser} />
                <Route path='/logout' component={Logout} /> */}
              {/* </Switch> */}
            {/* </div> */}
            {user && <Footer />}
          </div>
        </Router>
      </AppContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
