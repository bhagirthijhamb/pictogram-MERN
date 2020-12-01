import { Fragment, useState } from 'react';
import { useState } from 'react'
// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
//
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const createPost = () => {
    const [ open, setOpen ] = useState(false);
    const [ text, setText ] = useState('');
    const [ errors, setErrors ] = useState({});

    return (
        <Fragment>
            <Button onClick={handleOpen}>
                Post
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
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>Submit
                            {loading && (
                                <CircularProgress size={30} className="progressSpinner" />
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
