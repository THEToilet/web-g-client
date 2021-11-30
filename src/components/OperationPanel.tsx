import {useDispatch, useSelector} from "react-redux";

import {getGSetting} from '../store/selector'
import {getGSignalingStatus} from '../store/selector'
import {setDynamicSearch, setSearchDistance, setStaticSearch} from '../store/slices/gSetting'
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import React, {useRef} from "react";
import {Box, Typography} from "@mui/material";

const OperationPanel = () => {
    const searchDistanceFiledRef = useRef<HTMLInputElement>()

    const {searchDistance, searchType} = useSelector(getGSetting)
    const {userInfo, surroundingUserList, userID} = useSelector(getGSignalingStatus)
    const dispatch = useDispatch()

    const handleChange = (event: SelectChangeEvent) => {
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
        <Box>
            <Typography variant="h5" gutterBottom component="div">
                h3. Heading
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                {/*"userID : " + userID*/}
                userID : 123d-3145-f3de-3423-7685-2134
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                {userInfo.geoLocation.latitude + " , " + userInfo.geoLocation.longitude}
            </Typography>
            <div>{"surroundingUserList size :" + surroundingUserList.length}</div>
            <Box sx={{mx: 10}}>
                <Typography variant="subtitle2" gutterBottom component="div">
                    now Search Distance : 100
                </Typography>
                <Box sx={{display: 'flex'}}>
                    <FormControl sx={{m: 1, minWidth: 10}}>
                        <TextField inputRef={searchDistanceFiledRef} id={'search-distance'} label={"SearchDistance"}
                                   variant="standard"
                                   defaultValue={searchDistance}/>
                    </FormControl>
                    <Button variant='contained' onClick={handleSearchDistanceChange}>Change</Button>
                </Box>
            </Box>
            <FormControl sx={{m: 1, minWidth: 200}}>
                <InputLabel id="demo-simple-select-autowidth-label">SearchType</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={'static'}
                    onChange={handleChange}
                    autoWidth
                    label={searchType}
                >
                    <MenuItem value='static'>Static Search</MenuItem>
                    <MenuItem value='dynamic'>Dynamic Search</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
export default OperationPanel