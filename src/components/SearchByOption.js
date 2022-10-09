import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

SearchByOption.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function SearchByOption({ options = [], onSort }) {
  return (
    <TextField select sx={{width:200, height:56}} size="small" value="Search By Category" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option._id} value={option._id}>
          {option.namecategory}
        </MenuItem>
      ))}
    </TextField>
  );
}
