import React, { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RepeatIcon from '@mui/icons-material/Repeat';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskManagerItem } from './TaskManagerItem';
import styles from './TaskManager.module.css';
import PickerWithButtonField from './DatePicker';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { WeatherWidget } from './Weather';

export const TaskManager = (props) => {


  const [taskInput, setTaskInput] = useState(props.data);


  const saveData = () => {
    console.log(taskInput);
    props.updateTaskData(taskInput);
    props.openCloseItemDrawer();
  }

  const setTaskData = (key, value) => {
    console.log(key + ' : ' + value);
    setTaskInput(prev => ({...prev, [key]: value}));
  }

  const deleteTaskFromList = () => {
    props.deleteTaskFromList(taskInput.name);
    props.openCloseItemDrawer();
  }

  useEffect(()=> {
    setTaskInput(props.data);
  }, [props.data]);

  const getDateInFormat = (date) => {
    if(new Date(date).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)) {
        return 'Created Today'
    }
    let d = new Date(date);
    let year = d.getFullYear();
    let month = (1 + d.getMonth()).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    return 'Created on ' + day + '/' + month + '/' + year;
  }
  return (
    <div className={styles.mainContent}>
      <div className={styles.taskContainer}>
        <TaskManagerItem text={taskInput.name} isCompleted={taskInput.completed} isFavorite={taskInput.favorite} setTaskData={setTaskData}/>
        <TaskManagerItem text="Add Step" icon={<AddIcon />} hasCheckbox={false} pointer={true} setTaskData={setTaskData}/>
        <TaskManagerItem text="Set Reminder" icon={<NotificationsIcon />} hasCheckbox={false} 
            isActive={taskInput.reminder} pointer={true} setTaskData={setTaskData}/>
        
        <PickerWithButtonField setValue={(value) => setTaskData('date', value)} value={taskInput.date} page='TaskManager' />
        
        <TaskManagerItem text="Repeat" icon={<RepeatIcon />} hasCheckbox={false} isActive={taskInput.repeat} pointer={true} setTaskData={setTaskData}/>


        <TaskManagerItem text="Planning to go out? Check weather now" icon={<CloudQueueIcon />} hasCheckbox={false} />
        <div className={styles.taskManagerWeather}>
            <WeatherWidget></WeatherWidget>
        </div>
        

        <Button
            variant="text"
            onClick={saveData}
            sx={{ color: 'green', background: '#9dd4a5', bottom: '0px' }} >
        Save
        </Button>

        <div className={styles.footer}>
          <IconButton onClick={props.openCloseItemDrawer}>
            <CloseIcon />
          </IconButton>
          <div>{getDateInFormat(taskInput.createdDate)} </div>
          <IconButton onClick={deleteTaskFromList}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};