import { Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)

    const paperStyle = { padding: 60, height: 400, width: 500, margin: "100px auto"}

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <Button  onClick={goBack}>Go Back</Button>
            </div>
            </Paper>
        </Grid>
    )
}

export default Unauthorized
