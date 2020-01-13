import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useFormToUri } from '../hooks/useFormToUri';

type InputField = React.FC<{
  urlParam: string;
  label?: string;
  type?: string;
  defaultProp?: number | null | string;
  placeholder?: string;
}>;

export const InputSearchField: InputField = ({
  urlParam,
  defaultProp,
  ...inputProps
}) => {
  const [startDate, setStartDate] = useFormToUri(urlParam, defaultProp);

  return (
    <TextField
      value={startDate}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        setStartDate(e.target.value);
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...inputProps}
      InputLabelProps={{ shrink: true }}
    />
  );
};
