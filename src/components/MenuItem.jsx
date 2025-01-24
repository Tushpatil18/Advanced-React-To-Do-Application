import React from 'react';
import styles from './ToDoApp.module.css';

export const MenuItem = ({ icon, label, active, onClickHandle }) => {
  return (
    <div className={active ? styles.menuItemActive : styles.menuItem} onClick={onClickHandle}>
      {icon}
      <span>{label}</span>
    </div>
  );
};