import {Box, Button, Container, List, ListItem, ListItemText, Paper, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React, {useRef} from "react";
import Fab from "@mui/material/Fab";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Chat = () => {
    return (
        <Container sx={{textAlign: 'center'}}>
            <Paper elevation={8} sx={{}}>
                <Box sx={{pb: 2}}>
                    <Fab color="secondary" aria-label="add">
                        <LocationOnIcon/>
                    </Fab>
                </Box>
                <Box sx={{mx: 'auto'}}>
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': {padding: 0},
                            mx: "auto",
                        }}
                    >
                        {[0, 1, 2, 3, 4].map((sectionId) => (
                            <li key={`section-${sectionId}`}>
                                <ul>
                                    {[0, 1, 2].map((item) => (
                                        <ListItem key={`item-${sectionId}-${item}`}>
                                            <ListItemText primary={`Item ${item}`}/>
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </List>
                </Box>
                <Box>
                    <TextField
                        id="standard-multiline-static"
                        label="message"
                        multiline
                        defaultValue="Default Value"
                        variant="standard"
                    />
                    {/*<button>SendDataChannel</button>*/}
                    <Button variant="contained" endIcon={<SendIcon/>}>
                        Send
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
export default Chat