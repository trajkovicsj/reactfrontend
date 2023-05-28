const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/createUserTask">Create user task</a></li>
                <li><a href="/users">Users</a></li>
                <li><a href="/usersTasks">Users tasks</a></li>
                <li><a href="/createUser">Create user</a></li>
            </ul>
        </nav>
    )
}

export default Header
