import React from "react";
import moment from "moment";
import { Box } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export const dateFormat = "DD-MM-YYYY";
const defaultValue = [moment().startOf("week"), moment().endOf("week")];

const RangePicker = ({ value = defaultValue, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        label="Advanced keyboard"
        value={[moment(value[0], dateFormat), moment(value[1], dateFormat)]}
        defaultValue={defaultValue}
        onChange={onChange}
        inputFormat={dateFormat}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <input ref={startProps.inputRef} {...startProps.inputProps} />
            <Box sx={{ mx: 1 }}> to </Box>
            <input ref={endProps.inputRef} {...endProps.inputProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
};

export default RangePicker;
