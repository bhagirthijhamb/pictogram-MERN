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

import Input from '@material-ui/core/Input';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
// Context
import { AppContext } from '../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';
import { LIKE_POST, UNLIKE_POST } from './../../context/types';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 550,
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
        backgroundColor: 'red[500]',
    },
}))

const Post = (props) => {
    const [state, dispatch] = useContext(AppContext); 

    // console.log(props.post);
    const { _id, text, author, imageUrl, likes } = props.post
    // console.log(props.post);
    // console.log(text, author, imageUrl)
    const classes = useStyles();

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
            console.log(data)
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
    return (
         <Card className={classes.root} key={_id}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreHorizIcon />
                </IconButton>
                }
                title={author.name}
                // subheader="September 14, 2016"
            />
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
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon style={{ color: 'red', fontSize: 28 }} onClick={() => {likePost(_id)}} />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon style={{ color: 'red', fontSize: 28 }} onClick={() => {unlikePost(_id)}} />
                </IconButton>
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
            <TextField
                variant="outlined"
                // required
                fullWidth
                id="comment"
                label="Add a comment... "
                name="name"
                autoComplete="lname"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
        </Card>
    )
}

export default Post;