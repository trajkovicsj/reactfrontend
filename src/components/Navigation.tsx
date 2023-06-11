import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material"

const Navigation = () => {

    return (

        <AppBar sx={{ backgroundColor: '#aa80ff' }}><Toolbar>
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
    )
}

export default Navigation
