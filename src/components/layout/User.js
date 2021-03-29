import { Link } from 'react-router-dom';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TextField from '@material-ui/core/TextField';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import Input from '@material-ui/core/Input';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
// Context
import { AppContext } from '../../context/appContext';
import { useState, useContext, useEffect, useCallback } from 'react';
import { LIKE_POST, SUBMIT_COMMENT, UNLIKE_POST, DELETE_POST, DELETE_COMMENT } from './../../context/types';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 550,
        marginBottom: 20,
        border: '1px solid #B7D4DB',
        boxShadow: '5px 5px #B7D4DB',
        position: 'relative'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#FF7A89',
        fontSize: 16
    },
    authorName: {
        marginLeft: '10px !important',
        fontWeight: "bold",
        fontSize: '1rem',
        // color: '#CC616E'
    },
    postDelete: {
        position: "absolute",
        right: '10px'
    },
    comments: {
        width: '95%',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        margin: "0 0"
    },
    commentSection: {
        display: "flex"
    },
    form: {
        // width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    commentName: {
        color: "#CC616E",
        fontWeight: 'bold',
        marginRight: 10
    },
    commentDelete: {
        padding: 0
    },
    likeBtn: {
        padding: 0
    },
    commentBtn: {
        padding: 0,
        marginLeft: 20
    }
}))

const User = (props) => {
    const [state, dispatch] = useContext(AppContext); 
    const { _id, name, imageUrl } = props.user
    // console.log(props.post)
    const classes = useStyles();
    const [comment, setComment] = useState('');

    // const handleSubmit = async(e) => {
    //     try {
    //         e.preventDefault();
    //         // console.log(comment);
    //         makeComment(comment, _id);
    //     } catch(err){
    //         console.log(err);
    //     }
    // }
    return (
         <Card className={classes.root} key={_id}>
            <CardActions>
                <Avatar aria-label="recipe" className={classes.avatar}>
                    <div className={classes.profileImage}>
                        <img style={{width: '50px', height: '50px', borderRadius: '25px'}} 
                        src={imageUrl}
                        />
                    </div>
                </Avatar>
                <Typography className={classes.authorName} component={Link} 
                to={_id !== state.user.credentials._id ? `/user/${_id}` : `/user` }
                >
                        {name}
                </Typography>
                {/* {author._id == state.user.credentials._id &&  */}
                    {/* <IconButton aria-label="settings" className={classes.postDelete}>
                        <DeleteOutlineIcon  
                        // onClick={() => {deletePost(_id)}} 
                        />
                    </IconButton> */}
                {/* } */}
                 <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.follow}
                    // onClick={() => followUser()}
                    >
                    <Link to={`/user/${_id}`}>Go</Link>
                </Button>
            </CardActions>
            {/* <CardMedia
                className={classes.media}
                image={imageUrl}
                title="Paella dish"
            /> */}
           
        </Card>
    )
}

export default User;