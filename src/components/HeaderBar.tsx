import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const HeaderBar = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="web-g-client"
                        sx={{mr: 2}}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        g-client
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default HeaderBar