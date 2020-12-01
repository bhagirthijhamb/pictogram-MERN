import { Fragment, useState } from 'react';
// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fade, makeStyles } from '@material-ui/core/styles';

//
import CloseIcon from '@material-ui/icons/Close';
import { SET_ERRORS, LOADING_UI, POST_POST } from '../../context/types';
import { AppContext } from '../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
}))
const CreatePost = () => {
    const classes = useStyles();

    const [state, dispatch] = useContext(AppContext); 
    const [ open, setOpen ] = useState(false);
    const [ text, setText ] = useState('');
    const [ errors, setErrors ] = useState({});

    function handleOpen() { setOpen(true) }
    function handleClose() { 
        setOpen(false) 
        setErrors({})
    }
    function handleChange(e) {
        setText(e.target.value)
    }
    async function handleSubmit(e){
        dispatch({ type: LOADING_UI });
        try {
            e.preventDefault();
            const url = `/api/posts/`;
            const method = 'POST';
            console.log(text)
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            })
            const data = await response.json();
            console.log(data)
            dispatch({
                type: POST_POST,
                payload: data
            })
            // dispatch(clearErrors())
            if(!response.ok) {
                throw new Error(data.message)
            }
        } catch(err){
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err
            })
            setErrors()
        }
    }
    console.log(state.ui.loading);
    return (
        <Fragment>
            <Button onClick={handleOpen}>
                + Post
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm' className="postBabbleDialogBox" >
                <div className="closePostBabbleBtn">
                    <Button onClick={handleClose} >
                        <CloseIcon />
                    </Button>
                </div>
                <DialogTitle>Post a new thought</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField name="body" type="text" label="Babble..." multiline rows="3" placeholder="Share with your friends..."  value={text} className="textField" onChange={handleChange} fullWidth />
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="raised-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button raised component="span" 
                            className={classes.button}
                            >
                            Upload
                            </Button>
                        </label>
                        <Button type="submit" variant="contained" color="primary" disabled={state.ui.loading}>Submit
                            {state.ui.loading && (
                                <CircularProgress size={30} className="progressSpinner" />
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default CreatePost;
