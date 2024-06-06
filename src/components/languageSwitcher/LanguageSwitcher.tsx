import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 120 }}
    >
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={language}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value={'English'}>English</MenuItem>
        <MenuItem value={'Russian'}>Русский</MenuItem>
      </Select>
    </FormControl>
  );
}
