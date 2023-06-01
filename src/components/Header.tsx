import "./styles.css"

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span><a href="/login">Login</a></span>
            <span><a href="/createUserTask">Create user task</a></span>
            <span><a href="/taskList">View tasks</a></span> 
            <span><a href="/users">Users</a></span>
            <span><a href="/usersTasks">Users tasks</a></span>
            <span><a href="/createUser">Create user</a></span>
            <span><a href="/logout">Logout</a></span>
        </nav>
    )
}

export default Header
