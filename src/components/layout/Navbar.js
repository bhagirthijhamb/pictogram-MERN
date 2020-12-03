import CreatePost from './../post/CreatePost';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: "1200px",
        display: 'flex',
        alignItems: "center",
        margin: "0 auto"
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
     sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
}))

const NavBar = () => {
    let { path, url } = useRouteMatch();

    const classes = useStyles();
    return (
        <AppBar>
            <Toolbar>
                <div className={classes.navContainer}>
                        <Typography className={classes.title} variant="h6" noWrap>Pictogram</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <CreatePost />
                        {/* <Button color="inherit" component={Link} to="/login">Login</Button> */}
                        {/* <Button color="inherit" component={Link} to="/signup">Signup</Button> */}
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            // onClick={handleProfileMenuOpen}
                            color="inherit"
                            component={Link} to="/user"
                            >
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                    {/* <div> */}
                        <IconButton
                            aria-label="show more"
                            // aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            // onClick={handleMobileMenuOpen}
                            color="inherit"
                            >
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </div>
                
            </Toolbar>
        </AppBar>
        // <nav>
        //     <div className="nav-wrapper">
        //     <Link to="#" className="brand-logo left">Pictogram</Link>
        //     <ul id="nav-mobile" className="right">
        //         <li><Link to="/login">Login</Link></li>
        //         <li><Link to="/signup">Signup</Link></li>
        //         <li><Link to="/users/:handle">Profile</Link></li>
        //     </ul>
        //     </div>
        // </nav>
    )
}

export default NavBar;