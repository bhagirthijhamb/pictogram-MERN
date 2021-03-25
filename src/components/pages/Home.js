import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
// components
import PostList from './../post/PostList';
import { SET_USER } from './../../context/types';


import { AppContext } from '../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';



const Home = (props) => {


    const [state, dispatch] = useContext(AppContext); 
    
    useEffect(() => {
        dispatch({ type: SET_USER, payload: props.user })
    },[props.user])


    return (
        <div className="classes root container">
           {props.children}
        </div>
        
    )
} 


export default Home;