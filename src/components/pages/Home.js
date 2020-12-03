import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
// components
import PostList from './../post/PostList';
import User from './../profile/User';
import { SET_USER } from './../../context/types';


import { AppContext } from '../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';
import NavBar from '../layout/Navbar';



const Home = (props) => {
    let { path, url } = useRouteMatch();
    console.log(path, url)

    const [state, dispatch] = useContext(AppContext); 
    
    useEffect(() => {
        dispatch({ type: SET_USER, payload: props.user })
    },[props.user])

    return (
        <div className="classes root container">
            {/* <Link to={`${url}/user`}>User</Link> */}
            {/* <PostList /> */}
            <Switch>
                <Route exact path='/' component={PostList} />
                {/* <Route exact path={path} component={PostList} /> */}
                {/* <Route path='/user' component={User} /> */}
                {/* <Route path={`${path}/user`} component={User} /> */}
            </Switch>
        </div>
        
    )
} 


export default Home;