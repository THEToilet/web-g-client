import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getGSetting} from '../store/selector'
import {getGSignalingStatus} from '../store/selector'
import {setDynamicSearch, setSearchDistance, setStaticSearch} from '../store/slices/gSetting'
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {Box, List, ListItem, ListItemText, ListSubheader, NativeSelect, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const OperationPanel = () => {
    const searchDistanceFiledRef = useRef<HTMLInputElement>()

    const {searchDistance, searchType} = useSelector(getGSetting)
    const {userInfo, surroundingUserList, userID, userName} = useSelector(getGSignalingStatus)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleChange = (event: any) => {
        if (event.target.value === 'static') {
            dispatch(setStaticSearch())
        } else {
            dispatch(setDynamicSearch())
        }
    };

    const handleSearchDistanceChange = () => {
        if (searchDistanceFiledRef.current) {
            console.log(searchDistanceFiledRef.current?.value)
            dispatch(setSearchDistance(Number(searchDistanceFiledRef.current?.value)))
        }
    }

    const transitionVideo = async () => {
        console.log('transitionVideo')
        navigate('/video')
    }

    return (
        <Box sx={{px: 10}}>
            <Typography variant="h5" gutterBottom component="div">
                {userName}
                {/*User Name*/}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
                {userID}
                {/*123d-3145-f3de-3423-7685-2134*/}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
                {userInfo.geoLocation.latitude + " , " + userInfo.geoLocation.longitude}
            </Typography>
            <Box sx={{}}>
                <Typography variant="subtitle2" gutterBottom component="div">
                    {/*Search Distance : 100*/}
                    {'Search Distance : ' + searchDistance}
                </Typography>
                <Box sx={{display: 'flex'}}>
                    <FormControl sx={{m: 1, minWidth: 10}}>
                        <TextField inputRef={searchDistanceFiledRef} id={'search-distance'} label={"SearchDistance"}
                                   variant="standard"
                                   defaultValue={searchDistance}
                                   inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        />
                    </FormControl>
                    <Button variant='contained' onClick={handleSearchDistanceChange}>Change</Button>
                </Box>
            </Box>
            <FormControl sx={{m: 1, minWidth: 200}}>
                <NativeSelect
                    id="select"
                    onClick={handleChange}
                >
                    <option value='static'>Static Search</option>
                    <option value='dynamic'>Dynamic Search</option>
                </NativeSelect>
            </FormControl>
            <Typography variant="subtitle2" gutterBottom component="div" sx={{ml: 5}}>
                {"SurroundingUserList size :" + surroundingUserList.length}
            </Typography>
            <Box>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': {padding: 0},
                    }}
                    subheader={<li/>}
                >
                    {surroundingUserList.map((userInfo) => (
                        <li key={`section-${userInfo.userID}`}>
                            <ul>
                                <ListItem key={`item-${userInfo.userID}-${userInfo}`}>
                                    <ListItemText primary={`User`}
                                                  secondary={
                                                      <>
                                                          <Typography
                                                              sx={{display: 'inline'}}
                                                              component="span"
                                                              variant="body2"
                                                              color="text.primary"
                                                          >
                                                              {userInfo.userID}
                                                          </Typography>
                                                          {userInfo.geoLocation.latitude + ' , ' + userInfo.geoLocation.longitude}
                                                      </>
                                                  }/>
                                    <Button onClick={transitionVideo}>Connect</Button>
                                </ListItem>
                            </ul>
                        </li>
                    ))}
                </List>
            </Box>
        </Box>
    )
}
export default OperationPanel