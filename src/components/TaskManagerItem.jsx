import React from 'react';
import { IconButton, Checkbox } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styles from './TaskManager.module.css';

export const TaskManagerItem = ({ text, hasCheckbox = true, icon, isActive, isCompleted, isFavorite, onClick, ref, pointer, setTaskData }) => {
  
  const setActive = () => {
    if(text === 'Set Reminder') {
      setTaskData('reminder', !isActive);
    } else if(text === 'Repeat') {
      setTaskData('repeat', !isActive);
    }
  };
  
  return (
    <div className={styles.taskItem} onClick={onClick} ref={ref}>
      {hasCheckbox && (
        <div className={styles.checkboxContainer} >
          <Checkbox size="small" 
            onClick={()=> setTaskData('completed', !isCompleted)}
            className={isCompleted ? styles.taskCheckboxCompleted : styles.taskCheckbox}
            checked={isCompleted}
            style={{color: 'green'}}
          />
        </div>
      )}
      {icon && (
        <IconButton style={{color: isActive? 'green' : '#555', cursor: pointer?'pointer': 'default'}} onClick={setActive} >
          {icon}
        </IconButton>
      )}
      <div className={styles.taskText} style={{color: isActive? 'green' : '#555', cursor: pointer?'pointer': 'default'}} onClick={()=>setActive()}>
        {text}
      </div>
      {!icon && (
        <IconButton style={{color: isFavorite? 'green' : '#555'}} 
          onClick={()=> setTaskData('favorite', !isFavorite)} >
          <StarIcon />
        </IconButton>
      )}
    </div>
  );
};