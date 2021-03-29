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
    const { user, children } = props;
    const [state, dispatch] = useContext(AppContext); 
    
    useEffect(() => {
        dispatch({ type: SET_USER, payload: props.user })
    },[user])

    return (
        <div className="classes root container">
           {/* {children} */}
            <Grid container spacing={4}>
                <Grid item sm={1} xs={12}>
                </Grid>
                <Grid item sm={7} xs={12}>
                    {children[0]}
                </Grid>
                <Grid item sm={2} xs={12}>
                    {children[1]}
                </Grid>
                <Grid item sm={1} xs={12}>
                </Grid>
            </Grid>
        </div> 
    )
} 


export default Home;