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
        fontSize: 20
    },
    authorName: {
        marginLeft: '20px !important',
        fontWeight: "bold",
        fontSize: '1.3rem',
        // color: '#CC616E'
    },
    postDelete: {
        position: "absolute",
        right: '10px'
    },
    comments: {
        padding: '0px 10px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: "center"
    },
    commentSection: {
        display: "flex"
    },
    form: {
        // width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}))

const Post = (props) => {
    const [state, dispatch] = useContext(AppContext); 
    const { _id, text, author, imageUrl, likes, comments } = props.post
    console.log(state.user)
    const classes = useStyles();
    const [comment, setComment] = useState('');

    const likePost = async(id) => {
        try {
            const response = await fetch('/api/posts/like', {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: id
                })
            })
            const data = await response.json();
            // console.log(data)
            dispatch({
                type: LIKE_POST,
                payload: data
            })

        } catch (err){
            console.log(err);
        }
    }

    const unlikePost = async(id) => {
        try {
            const response = await fetch('/api/posts/unlike', {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: id
                })
            })
            const data = await response.json();
            console.log(data)
            dispatch({
                type: UNLIKE_POST,
                payload: data
            })
        } catch (err){
            console.log(err);
        }
    }

    const makeComment  = async(text, postId) => {
        try {
            const response = await fetch('/api/posts/comment', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId,
                    text
                })
            })
            const data = await response.json();
            if(data){
                console.log(data)
                dispatch({
                    type: SUBMIT_COMMENT,
                    payload: data
                })
                setComment('')
            }
        } catch(err) {
            console.log(err);
        }
    }
    const deletePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/deletePost/${postId}`, {
                method: 'delete',
                headers: {
                    credentials: 'include',
                }
            })
            const result = await response.json();
            console.log(result);
            if(result){
                dispatch({
                    type: DELETE_POST,
                    payload: result
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const deleteComment = async (postId, commentId) => {
        console.log(postId, commentId);
        try {
            const response = await fetch(`/api/posts/deleteComment/${postId}/${commentId}`, {
                method: 'delete',
                headers: {
                    credentials: 'include',
                }
            })
            const result = await response.json();
            console.log(result);
            if(result){
                dispatch({
                    type: DELETE_COMMENT,
                    payload: result
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            console.log(comment);
            makeComment(comment, _id);
        } catch(err){
            console.log(err);
        }
    }
    return (
         <Card className={classes.root} key={_id}>
            <CardActions>
                <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                </Avatar>
                <Typography className={classes.authorName} component={Link} to={author._id !== state.user.credentials._id ? `/user/${author._id}` : `/user` }>
                {/* <Typography className={classes.root} component={Link} to={`/user/${author._id}` }> */}
                        {author.name}
                </Typography>
                {author._id == state.user.credentials._id && 
                    <IconButton aria-label="settings" className={classes.postDelete}>
                        <DeleteOutlineIcon  onClick={() => {deletePost(_id)}} />
                    </IconButton>
                }
            </CardActions>
            <CardMedia
                className={classes.media}
                image={imageUrl}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {likes.includes(state.user.credentials._id)
                ? <IconButton aria-label="add to favorites">
                    <FavoriteIcon style={{ color: 'red', fontSize: 28 }} onClick={() => {unlikePost(_id)}} />
                  </IconButton>
                : <IconButton aria-label="add to favorites">
                    <FavoriteIcon style={{ color: 'grey', fontSize: 28 }} onClick={() => {likePost(_id)}} />
                  </IconButton>
                }
                 <Typography variant="body2" color="textSecondary" component="p">
                    {likes.length} likes
                </Typography>
                <IconButton aria-label="add to favorites">
                    <ChatIcon />
                </IconButton>
                {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                <IconButton
                    // onClick={handleExpandClick}
                    // aria-expanded={expanded}
                    // aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            {
                comments.map(record => {
                    console.log(record.postedBy._id, state.user.credentials._id);
                    return (
                        <div className={classes.comments} key={record._id}>
                            <Typography variant="h6" color="secondary">{record.postedBy.name}</Typography>
                            <Typography variant="body1" style={{ marginLeft: 6, paddingTop: 4 }}>{record.text}</Typography>
                            {record.postedBy._id == state.user.credentials._id && 
                                <IconButton aria-label="settings">
                                    <DeleteOutlineIcon onClick={() => deleteComment(_id, record._id)} />
                                </IconButton>
                            }
                        </div>
                    )
                })
            }
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <div className={classes.commentSection}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="comment"
                    label="Add a comment... "
                    name="name"
                    autoComplete="lname"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    //   className={classes.submit}
                    >
                    Submit
                </Button>
            </div>
        </form>
            
        </Card>
    )
}

export default Post;