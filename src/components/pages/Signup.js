import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';

import { AppContext } from '../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';
import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from '../../context/types';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({})
  const history = useHistory();
  
  useEffect(() => {
    if(state.ui.errors){
      dispatch({ type: CLEAR_ERRORS })
      setErrors(state.ui.errors)
    }
  }, [state.ui.errors])
  
  console.log(errors)

  async function handleSubmit(e){
      // dispatch({ type: LOADING_UI });
      try {
          e.preventDefault();
          dispatch({ type: LOADING_UI });
          const url = `/api/users/`;
          const method = 'POST';
          const response = await fetch(url, {
              method,
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, password, email })
          })
          const data = await response.json();
          console.log(data)
          if(!response.ok){
            // throw new Error(data)
            dispatch({
              type: SET_ERRORS,
              payload: data
            })
          }
          if(response.ok){
            history.push('/login');

          }
      } catch(err){
          console.log(err)
          dispatch({
            type: SET_ERRORS,
            payload: err
          })
      }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}> */}
              {/* <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              /> */}
            {/* </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ame"
                label="Name"
                name="name"
                autoComplete="lname"
                helperText={errors.name} 
                error={errors.name ? true : false}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={errors.email} 
                error={errors.email ? true : false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errors.password} 
                error={errors.password ? true : false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;