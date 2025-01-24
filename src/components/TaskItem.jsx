import React from 'react';
import { IconButton, Checkbox } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styles from './ToDoApp.module.css';

export const TaskItem = (props) => {

  const openCloseItemDrawer = () => {
    props.openCloseItemDrawer(true);
    props.updateData(props.task);
  }
  
  return (
    <div className={styles.taskItem}>
      <div className={styles.taskItemContent}>
        <Checkbox 
          checked={props.task.completed}
          onClick={()=> props.setStatus('completed', !props.task.completed)}
          className={props.task.completed ? styles.taskCheckboxCompleted : styles.taskCheckbox}
          style={{color: 'green'}}
        />
        <div className={props.task.completed ? styles.taskLabelCompleted : styles.taskLabel} onClick={openCloseItemDrawer}>
          {props.task.name}
        </div>
      </div>
      <IconButton onClick={()=> props.setStatus('favorite', !props.task.favorite)} 
        style={{color: props.task.favorite? 'green' : 'grey'}} >
        <StarIcon />
      </IconButton>
    </div>
  );
};