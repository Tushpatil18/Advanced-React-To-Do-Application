import * as React from 'react';

import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { TaskManagerItem } from './TaskManagerItem';
import dayjs from 'dayjs';

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    props.slotProps.page === 'ToDoApp'?
    <Button
      variant="text"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayIcon />}
      sx={label===null?{ color: 'rgba(0, 0, 0, 0.54)' }: { color: 'green' }}
    >
        {label}
    </Button>
    :
    <TaskManagerItem 
      text={label === null? "Add Due Date" : label} 
      icon={<CalendarTodayIcon />} 
      hasCheckbox={false} 
      isActive={label !== null}
      ref={ref}
      pointer={true}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      />
  );
}

function ButtonDatePicker(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ ...props.slots, field: ButtonField }}
      slotProps={{ ...props.slotProps, field: { setOpen, }, page: props.page }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

export default function PickerWithButtonField(props) {
  const [value, setValue] = React.useState(props.value!==''? dayjs(props.value, "DD-MM-YYYY"): null);

  const dateChange = (date) => {
    setValue(date);
    props.setValue(date.format('DD/MM/YYYY'));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDatePicker
        label={value === null ? null : value.format('DD/MM/YYYY')}
        value={value}
        page={props.page}
        onChange={(newValue) => dateChange(newValue)}
      />
    </LocalizationProvider>
  );
}
