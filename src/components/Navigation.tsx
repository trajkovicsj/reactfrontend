import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import "./styles.css"
import { useState } from "react";


const Navigation = () => {
    
    return (

        <AppBar sx={{ backgroundColor: '#c3bef0' }}><Toolbar>
            <Typography><Tabs textColor="inherit" indicatorColor='secondary'>
                <Tab label='Login' href="/login"/>
                <Tab label='Create Task' href= "/createUserTask"/>
                <Tab label='View Tasks' href='/taskList'/>
                <Tab label='Users' href="/users"/>
                <Tab label='Create User' href="/createUser"/>
                <Tab label='Users Tasks' href='usersTasks' />
                <Button href="/logout">Logout</Button>
            </Tabs></Typography>
        </Toolbar></AppBar>
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <span><a href="/Login">Login</a></span>
        //     <span><a href="/createUserTask">Create user task</a></span>
        //     <span><a href="/taskList">View tasks</a></span> 
        //     <span><a href="/users">Users</a></span>
        //     <span><a href="/usersTasks">Users tasks</a></span>
        //     <span><a href="/createUser">Create user</a></span>
        //     <span><a href="/logout">Logout</a></span>
        // </nav>
    )
}

export default Navigation
