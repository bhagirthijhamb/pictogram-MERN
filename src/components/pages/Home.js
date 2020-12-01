import Grid from '@material-ui/core/Grid';
// components
import Navbar from './../Navbar';
import Post from './../post/Post'
import { LOADING_DATA, SET_POSTS } from './../../context/types';

//
import { AppContext } from '../../context/appContext';
//
// import { getPosts } from '../../context/appActions';
import { useContext, useEffect, useCallback } from 'react';


const Home = () => {
    const [state, dispatch] = useContext(AppContext); 

    const refresh = useCallback( async() => {
        dispatch({ type: LOADING_DATA });
        // console.log(state.posts.loading)
        try {
            const response = await fetch('/api/posts');
            const postRes = await response.json();
            // console.log(postRes);
            dispatch({ type: SET_POSTS, payload: postRes })
        } catch(err) {
            console.log(err)
            dispatch({ type: SET_POSTS, payload: [] })
        }
    }, []);

    useEffect(() => {
        refresh(); 
    }, [refresh]);

    // console.log('posts', state.posts.posts)
    console.log(state.post.loading)
    console.log(state.post.posts)

    // const { loading, posts } = state.


    const postsMarup = !state.post.loading ? (
        state.post.posts.map(post =>{
            console.log(post)
            return <Post key={post._id} post={post} />
            return <p>{post.text}</p>
        }
        )) : (<p>Loading...</p>)

    return (
        <div className="classes root">
            <Navbar />
            <Grid container spacing={4}>
                <Grid item sm={2} xs={12}>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <h2>Home</h2>
                    {postsMarup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <h2>Follow..</h2>
                </Grid>
            </Grid>
        </div>
        
    )
} 


export default Home;