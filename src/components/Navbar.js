const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
            <a href="#" className="brand-logo left">Logo</a>
            <ul id="nav-mobile" className="right">
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
                <li><a href="/users/:handle">Profile</a></li>
            </ul>
            </div>
        </nav>
    )
}

export default NavBar;