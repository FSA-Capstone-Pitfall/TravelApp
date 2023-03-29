import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Filters = ({ label, placeholder, options, onChange }) => {
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={options}
      getOptionLabel={(option) => option}
      defaultValue={[]}
      style={{ width: '50%' }}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
        />
      )}
      onChange={(event, finalValues) => {
        onChange(finalValues);
      }}
    />
  );
};

export default Filters;