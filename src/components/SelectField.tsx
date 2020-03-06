import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { useFormToUri } from '../hooks/useFormToUri';

type SelectFieldProps = {
  urlParam: string;
  id: string;
  label: string;
  defaultProp?: number | null | string;
  placeholder?: string;
};

const useSelectFieldStyles = makeStyles({
  list: {
    paddingTop: 0,
  },
});

export const SelectField: React.FC<SelectFieldProps> = ({
  urlParam,
  defaultProp,
  id,
  label,
  placeholder = 'Select...',
  children,
}) => {
  const [value, selectValue] = useFormToUri(urlParam, defaultProp);
  const classes = useSelectFieldStyles();
  return (
    <FormControl>
      <InputLabel variant="outlined" shrink id={id}>
        {label}
      </InputLabel>
      <Select
        placeholder={placeholder}
        labelId={id}
        variant="outlined"
        value={value}
        onChange={(event: React.ChangeEvent<{ value: unknown }>): void => {
          selectValue(event.target.value as string);
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          classes,
        }}
        IconComponent={KeyboardArrowDown}
      >
        <MenuItem value="">All</MenuItem>
        {children}
      </Select>
    </FormControl>
  );
};
