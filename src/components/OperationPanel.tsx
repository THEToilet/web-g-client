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
import {ChangeEvent, useRef} from "react";

const OperationPanel = () => {
    const searchDistanceFiledRef = useRef<HTMLInputElement>()

    const {searchDistance, searchType} = useSelector(getGSetting)
    const {userInfo, surroundingUserList} = useSelector(getGSignalingStatus)
    const dispatch = useDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value === 'static') {
            dispatch(setStaticSearch())
        } else {
            dispatch(setDynamicSearch())
        }
    };

    const handleSearchDistanceChange = (e: any) => {
        if (searchDistanceFiledRef.current) {
            console.log(searchDistanceFiledRef.current?.value)
            dispatch(setSearchDistance(Number(searchDistanceFiledRef.current?.value)))
        }
    }

    return (
        <div style={{}}>
            <div>{userInfo.geoLocation.latitude + " , " + userInfo.geoLocation.longitude}</div>
            <div>{"surroundingUserList size :" + surroundingUserList.length}</div>
            {/*          <Stack spacing={2} direction="row">*/}
            <FormControl sx={{m: 1, minWidth: 80}}>
                <TextField inputRef={searchDistanceFiledRef} id={'search-distance'} label={"SearchDistance"}
                           defaultValue={searchDistance}/>
            </FormControl>
            <Button variant='contained' onClick={handleSearchDistanceChange}>SetDistance</Button>
            <FormControl sx={{m: 1, minWidth: 200}}>
                <InputLabel id="demo-simple-select-autowidth-label">SearchType</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={'static'}
                    onChange={handleChange}
                    autoWidth
                    label="SearchType"
                >
                    <MenuItem value='static'>Static Search</MenuItem>
                    <MenuItem value='dynamic'>Dynamic Search</MenuItem>
                </Select>
            </FormControl>
            {/*</Stack>*/}
        </div>
    )
}
export default OperationPanel