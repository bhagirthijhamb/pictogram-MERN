import Grid from '@material-ui/core/Grid';
import { AppContext } from './../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    profileContainer: {
        dispatch: "flex",
        justifyContent: 'space-around',
        margin: "18px 0px",
        borderBottom: "ipx solid grey"
    }
}))

const User = () => {
    const classes = useStyles();
    const [state, dispatch] = useContext(AppContext); 
    console.log(state.user);
    return (
        <div className="classes root container">
            <Grid container spacing={4}>
                <Grid item sm={2} xs={12}>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <h2>User</h2>
                    <div className={classes.profileContainer}>
                        <div>
                            <img style={{width: '150px', hight: '150px', borderRadius: '80px'}} src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                        </div>  
                        <div>
                            <h4>Geeta Verma</h4>
                        </div>
                    </div>
                    
                </Grid>
                <Grid item sm={2} xs={12}>
                    {/* <h2>Follows..</h2> */}
                </Grid>
            </Grid>
        </div>
    )
}

export default User;