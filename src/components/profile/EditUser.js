import Grid from '@material-ui/core/Grid';
import { AppContext } from './../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { Typography } from '@material-ui/core';
import { SET_USER, SET_USER_POSTS } from './../../context/types';
import { Button } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    profilePageTop: {
        display: "flex",
        borderBottom: "1px solid grey",
        width: "100%",
        padding: "30px 0px"
    },
    name_editProfile: {
        display: 'flex',
        justifyContent: 'space-between'
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

const EditUser = () => {
    const classes = useStyles();
    const [state, dispatch] = useContext(AppContext); 

    const getMyProfile = useCallback(async function() {
        try {
        const response = await fetch('/api/users/user', {
            headers: {
                credentials: 'include',
            },
        })
        const json = await response.json();
        console.log(json);
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

  const { credentials: {name, imageUrl, bio, webiste, email, followers, following}, myPosts } = state.user;
  console.log(followers, following)

    return (
        // <div className="classes root container">
            <Grid container spacing={4}>
                <Grid item sm={2} xs={12}>
                </Grid>
                <Grid item sm={8} xs={12} container>
                    <div className={classes.editProfile}>
                      <h3>Edit User Profile</h3>
                        <div className={classes.editImage}>
                            <img style={{width: '150px', height: '150px', borderRadius: '80px'}} src={imageUrl}/>
                            {/* <Link >Change Profile Photo</Link> */}
                        </div>  
                        <div className={classes.editImage}>
                            <form className={classes.form} 
                            // onSubmit={handleSubmit} 
                            noValidate>
                              <TextField
                                variant="outlined" margin="normal" required fullWidth id="email" 
                                label="Email Address" name="email" autoComplete="email" autoFocus
                                // value={email} helperText={errors.email} error={errors.email ? true : false}
                                // onChange={(e) => { setEmail(e.target.value); }}
                              />
            
           
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                              >
                                Submit
                              </Button>
                            </form>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={2} xs={12}>
                    {/* <h2>Follows..</h2> */}
                </Grid>
            </Grid>
        // </div>
    )
}

export default EditUser;