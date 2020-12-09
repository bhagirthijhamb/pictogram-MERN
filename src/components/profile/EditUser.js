import Grid from '@material-ui/core/Grid';
import { AppContext } from './../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { SET_USER, SET_USER_POSTS } from './../../context/types';
import { Button } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    editProfile: {
      width: "100%",
      padding: "1rem",
      marginTop: 50
    },
    userDetail: {
      display: "flex",
      alignItems: "Center"
    },
    label: {
      width: "40%",
      display: "flex",
      justifyContent: "flex-end",
      paddingRight: 40
    },
    formField: {
      width: "60%"
    },
    submit: {
      marginTop: 10,
      display: "block",
      margin: "0 auto"
    },
    name: {
      fontWeight: 'bold'
    },
    subtitle: {
      fontWeight: 'bold'
    },
    input: {
        display: 'none',
    },
    button: {
      border: "1px solid #84A1A8"
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
                      <form className={classes.form} 
                      // onSubmit={handleSubmit} 
                      noValidate>
                        {/* Image */}
                        <div className={classes.userDetail}>
                          <div className={classes.label}>
                            <img style={{width: '100px', height: '100px', borderRadius: '80px'}} src={imageUrl}/>
                          </div>
                          <div className={classes.formField}>
                            <Typography variant="h5" className={classes.name}>{name}</Typography>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="raised-button-file"
                                multiple
                                type="file"
                                // onChange={(e) => setImage(e.target.files[0])}
                            />
                            <label htmlFor="raised-button-file">
                                <Button raised component="span" 
                                className={classes.button}
                                >
                                Change Profile Photo
                                </Button>
                            </label>
                          </div>
                        </div>
                        {/* Website */}
                        <div className={classes.userDetail}>
                          <div className={classes.label}>
                            <Typography variant="subtitle1" className={classes.subtitle}>Website</Typography>
                          </div>
                          <div className={classes.formField}>
                            <TextField
                              variant="outlined" margin="normal" fullWidth id="email" 
                              label="Website" name="email" autoComplete="email" autoFocus
                              // value={email} helperText={errors.email} error={errors.email ? true : false}
                              // onChange={(e) => { setEmail(e.target.value); }}
                            />
                          </div>
                        </div>
                        {/* Bio */}
                        <div className={classes.userDetail}>
                          <div className={classes.label}>
                            <Typography variant="subtitle1" className={classes.subtitle}>Bio</Typography>
                          </div>
                          <div className={classes.formField}>
                            {/* <TextField
                              variant="outlined" margin="normal" fullWidth id="email" 
                              label="Bio" name="email" autoComplete="email" autoFocus
                              // value={email} helperText={errors.email} error={errors.email ? true : false}
                              // onChange={(e) => { setEmail(e.target.value); }}
                            /> */}
                            <TextField variant="outlined" name="body" type="text" label="Bio" multiline rows="2" placeholder="Bio"  
                            // value={text} 
                            className="textField" 
                            // onChange={handleChange} 
                            fullWidth />
                          </div>
                        </div>
                        
                        <Button
                          type="submit"
                          // fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          Submit
                        </Button>
                      </form>
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