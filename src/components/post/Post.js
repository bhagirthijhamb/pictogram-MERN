import { Link } from 'react-router-dom';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    }, 
    image:{
        minWidth: 150,
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    }
}))

const Post = (props) => {
    const { text, author } = props.post
    const classes = useStyles();
    return (
         <Card className={classes.card}>
            <CardMedia 
                // image={userImage}
                title="Profile image"
                className={classes.image}
            />
            <CardContent className={classes.content}>
                {/* {deleteButton} */}
                {/* <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color='primary'>{userHandle}</Typography>  */}
                {/* <Typography variant="h5" component={Link}  color='primary'>{author.name}</Typography>  */}
                {/* <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>  */}
                {/* <Typography variant="body1">{body}</Typography>  */}
                <Typography variant="body1">{text}</Typography> 
                {/* {likeButton} */}
                {/* <LikeButton screamId={screamId}/> */}
                {/* <span>{likeCount} Likes</span> */}
                <Button tip='comments'>
                    <ChatIcon color='primary'/>
                </Button>
                {/* <span>{commentCount} comments</span>    */}
                {/* <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>                  */}
            </CardContent>
        </Card>
    )
}

export default Post;