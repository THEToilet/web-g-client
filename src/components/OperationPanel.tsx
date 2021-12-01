import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getGSetting} from '../store/selector'
import {getGSignalingStatus} from '../store/selector'
import {setDynamicSearch, setSearchDistance, setStaticSearch} from '../store/slices/gSetting'
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {Box, List, ListItem, ListItemText, ListSubheader, NativeSelect, Typography} from "@mui/material";

const OperationPanel = () => {
    const searchDistanceFiledRef = useRef<HTMLInputElement>()

    const {searchDistance, searchType} = useSelector(getGSetting)
    const {userInfo, surroundingUserList, userID} = useSelector(getGSignalingStatus)
    const dispatch = useDispatch()

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

    return (
        <Box sx={{px: 10}}>
            <Typography variant="h5" gutterBottom component="div">
                User Name
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
                {/*"userID : " + userID*/}
                123d-3145-f3de-3423-7685-2134
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
                {userInfo.geoLocation.latitude + " , " + userInfo.geoLocation.longitude}
            </Typography>
            <Box sx={{}}>
                <Typography variant="subtitle2" gutterBottom component="div">
                    Search Distance : 100
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
                    {[0, 1, 2, 3, 4].map((sectionId) => (
                        <li key={`section-${sectionId}`}>
                            <ul>
                                {[0, 1, 2].map((item) => (
                                    <ListItem key={`item-${sectionId}-${item}`}>
                                        {/*<ListItemText primary={`Item ${item}`}/>*/}
                                        <ListItemText primary={`User`}
                                                      secondary={
                                                          <>
                                                              <Typography
                                                                  sx={{display: 'inline'}}
                                                                  component="span"
                                                                  variant="body2"
                                                                  color="text.primary"
                                                              >
                                                                  1234-1234-1231-1231-1232-1231
                                                              </Typography>
                                                              {"1234.5345 , 124334. 2341"}
                                                          </>
                                                      }/>
                                        <Button>Connect</Button>
                                    </ListItem>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
            </Box>
        </Box>
    )
}
export default OperationPanel