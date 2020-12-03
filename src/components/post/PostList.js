import Grid from '@material-ui/core/Grid';
// components
import Post from './../post/Post'
import { LOADING_DATA, SET_POSTS, LOADING_USER, SET_USER } from './../../context/types';
//
import { AppContext } from '../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';

const PostList = (props) => {
    const [state, dispatch] = useContext(AppContext); 

    const refresh = useCallback( async() => {
        dispatch({ type: LOADING_DATA });
        try {
            const response = await fetch('/api/posts');
            const postRes = await response.json();
            console.log(postRes);
            dispatch({ type: SET_POSTS, payload: postRes })
        } catch(err) {
            console.log(err)
            dispatch({ type: SET_POSTS, payload: [] })
        }
    }, []);

    useEffect(() => {
        refresh(); 
    }, [refresh]);

    const postsMarkup = !state.post.loading ? (
        state.post.posts.map(post =>{
            return <Post key={post._id} post={post} />
        }
        )) : (<p>Loading...</p>)

    return (
        <div className="classes root">
            <Grid container spacing={4}>
                <Grid item sm={2} xs={12}>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <h2>Home</h2>
                    {postsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <h2>Follow..</h2>
                </Grid>
            </Grid>
        </div>
        
    )
} 


export default PostList;