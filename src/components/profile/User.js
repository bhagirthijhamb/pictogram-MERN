import Grid from '@material-ui/core/Grid';
import { AppContext } from './../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { SET_USER, SET_USER_POSTS } from './../../context/types';


const useStyles = makeStyles(theme => ({
    profilePageTop: {
        display: "flex",
        borderBottom: "1px solid grey",
        width: "100%",
        padding: "30px 0px"
    },
    profileImage: {
        marginRight: '70px',
        marginLeft: '50px'
    },
    profileDetails: {
        width: '40%'
    },
    profileDetailsNumbers: {
        display: "flex",
        justifyContent: 'space-between',
    },
    profilePageGallery: {
        display: 'flex',
        flexWrap: "wrap",
        justifyContent: 'space-around',
        padding: "20px 0px"
    },
    profilePageGalleryImage: {
        width: "30%"
    }
}))

const User = () => {
    const classes = useStyles();
    const [state, dispatch] = useContext(AppContext); 

//     const getUser = useCallback(async function() {
//         try {
//         const response = await fetch('/api/users/me', {
//             headers: {
//                 credentials: 'include',
//             },
//         })
//         const json = await response.json();
//         if(!response.ok){
//             throw new Error(json.message);
//         }
//         dispatch({
//             type: SET_USER,
//             payload: json.data
//         })
//         } catch (err) {
//             console.log({ err });
//         }
//     }, [])

//     const getPosts = useCallback(async function() {
//         try {
//         const response = await fetch('/api/posts/myPosts', {
//             headers: {
//                 credentials: 'include',
//             },
//         })
//         const json = await response.json();
//         if(!response.ok){
//             throw new Error(json.message);
//         }
//         dispatch({
//             type: SET_USER_POSTS,
//             payload: json
//         })
//         } catch (err) {
//             console.log({ err });
//         }
//     }, [])

//   useEffect(() => {
//     getUser();
//     getPosts();
//   }, [getUser, getPosts])

    const getMyProfile = useCallback(async function() {
        try {
        const response = await fetch('/api/users/user', {
            headers: {
                credentials: 'include',
            },
        })
        const json = await response.json();
        console.log(json.user);
        console.log(json.userPosts);
        if(!response.ok){
            throw new Error(json.message);
        }
        dispatch({
            type: SET_USER,
            payload: json.user
        })
        dispatch({
            type: SET_USER_POSTS,
            payload: json.userPosts
        })
        } catch (err) {
            console.log({ err });
        }
    }, [])

    useEffect(() => {
        getMyProfile();
    }, [getMyProfile])


  const { credentials: {name, email}, myPosts } = state.user;
//   console.log(name, email, myPosts)

    return (
        <div className="classes root container">
            <Grid container spacing={4}>
                <Grid item sm={1} xs={12}>
                </Grid>
                <Grid item sm={10} xs={12} container>
                    <div className={classes.profilePageTop}>
                        <div className={classes.profileImage}>
                            <img style={{width: '150px', hieght: '150px', borderRadius: '80px'}} src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                        </div>  
                        <div className={classes.profileDetails}>
                            <Typography variant="h4">{name}</Typography>
                            <div className={classes.profileDetailsNumbers}>
                                <Typography variant="h6">20 posts</Typography>
                                <Typography variant="h6">50 followers</Typography>
                                <Typography variant="h6">40 following</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.profilePageBottom}>
                        <div className={classes.profilePageGallery}>
                            {myPosts.map(post => (
                                <div key={post._id} className={classes.profilePageGalleryImage}>
                                    <img src={post.imageUrl}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>
                <Grid item sm={1} xs={12}>
                    {/* <h2>Follows..</h2> */}
                </Grid>
            </Grid>
        </div>
    )
}

export default User;