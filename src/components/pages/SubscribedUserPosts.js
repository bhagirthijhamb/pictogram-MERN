import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
// components
import Post from './../post/Post';
import User from './../profile/User';
import { SET_USER } from './../../context/types';
import { useState, useEffect, useCallback } from 'react';


import { AppContext } from '../../context/appContext';
import NavBar from '../layout/Navbar';

const SubscribedUserPosts = (props) => {
    // const [state, dispatch] = useContext(AppContext); 
    const [subscribedPosts, setSubscribedPosts] = useState()

    const refresh = useCallback( async() => {
        // dispatch({ type: LOADING_DATA });
        try {
            const response = await fetch('/api/posts/getSubscribedPosts');
            const postRes = await response.json();
            // console.log(postRes);
            setSubscribedPosts(postRes);
        } catch(err) {
            console.log(err)
        }
    }, []);

    useEffect(() => {
        refresh(); 
    }, [refresh]);

     const postsMarkup = subscribedPosts ? (
        subscribedPosts.map(post =>{
            return <Post key={post._id} post={post} />
        }
        )) : (<p>Loading...</p>)


    return (
      // <div className="classes root container">
        <div className="classes root container">
          <Grid container spacing={4}>
              <Grid item sm={1} xs={12}>
              </Grid>
              <Grid item sm={7} xs={12}>
                  <h2>Subscribed Posts</h2>
                  {postsMarkup}
              </Grid>
              <Grid item sm={4} xs={12}>
                  {/* <h2>Follow..</h2> */}
              </Grid>
          </Grid>
        </div>
      // </div>

    )
} 


export default SubscribedUserPosts;