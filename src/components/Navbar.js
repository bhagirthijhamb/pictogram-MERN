import { Link } from 'react-router-dom';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Button } from '@material-ui/core';

const NavBar = () => {
    return (
        <AppBar>
            <Toolbar>
                {/* <Typography className={classes.title} variant="h6" noWrap>Pictogram</Typography> */}
                <Typography variant="h6" noWrap>Pictogram</Typography>
                {/* <div className={classes.search}> */}
                <div>
                    {/* <div className={classes.searchIcon}> */}
                    <div>
                        <SearchIcon />
                        {/* <Inputbase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} inputProps={{ 'aria-label': 'search' }} */}
                        <InputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </div>
                <div>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
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
                        >
                        <AccountBoxIcon />
                    </IconButton>
                </div>
                {/* <div className={classes.sectionMobile}> */}
                <div>
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