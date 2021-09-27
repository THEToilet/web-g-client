import {useDispatch, useSelector} from "react-redux";

import {getGSetting} from '../selector'
import {setDynamicSearch, setSearchDistance, setStaticSearch} from '../slices/gSetting'
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select, {SelectChangeEvent} from '@mui/material/Select';

const OperationPanel = () => {
    const {searchDistance, searchType} = useSelector(getGSetting)
    const dispatch = useDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value === 'static') {
            dispatch(setStaticSearch())
        } else {
            dispatch(setDynamicSearch())
        }
    };

    console.log(searchType)

    return (
        <>
            <FormControl sx={{m: 1, minWidth: 80}}>
                <TextField label={"SearchDistance"} defaultValue={searchDistance}/>
            </FormControl>
            <Button variant='contained'>Primary</Button>
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
        </>
    )
}
export default OperationPanel