import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

SearchByOption.propTypes = {
  options: PropTypes.array,
  setSelectByCategory: PropTypes.func
};

export default function SearchByOption({ options = [], setSelectByCategory }) {

  const handleChangeOption = (e) =>{
    setSelectByCategory(e.target.value)
  }
  return (
    <TextField select sx={{width:200, height:56}} size="small" defaultValue="" onChange={handleChangeOption}>
      {options.map((option) => (                                                   
        <MenuItem key={option._id} value={option._id} >
          {option.namecategory}
        </MenuItem>
      ))}
    </TextField>
  );
}
