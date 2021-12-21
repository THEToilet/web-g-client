import {Box, Container, List, ListItem, ListItemText, Paper, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React from "react";
import IconButton from '@mui/material/IconButton';
import CancelIcon from "@mui/icons-material/Cancel";

const Chat = (props: any) => {
    return (
        <Container sx={{textAlign: 'center', width: '50%'}}>
            <Paper elevation={8} sx={{}}>
                <Box sx={{display: 'flex', width: 'auto'}}>
                    <Box sx={{px: 15}}>
                        <Typography component="div" variant="h5">
                            Chat
                        </Typography>
                    </Box>
                    <Box sx={{px: 15}}>
                        <IconButton color="primary" aria-label="upload picture" component="span"
                                    onClick={props.toggleChat(false)}>
                            <CancelIcon/>
                        </IconButton>
                    </Box>
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
                        multiline
                        placeholder="message"
                        defaultValue=""
                        variant="standard"
                    />
                    {/*<button>SendDataChannel</button>*/}
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <SendIcon/>
                    </IconButton>
                </Box>
            </Paper>
        </Container>
    )
}
export default Chat