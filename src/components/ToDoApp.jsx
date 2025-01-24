import React, { useEffect, useState } from 'react';
import { IconButton, Menu, TextareaAutosize } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ListIcon from '@mui/icons-material/List';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RepeatIcon from '@mui/icons-material/Repeat';
import { MenuItem } from './MenuItem';
import { TaskItem } from './TaskItem';
import styles from './ToDoApp.module.css';
import { ArrowDropDown } from '@mui/icons-material';
import PickerWithButtonField from './DatePicker';
import { NavLink, useLocation } from 'react-router-dom';
import { TaskManager } from './TaskManager';

const menuItems = [
  { icon: <ListIcon />, label: 'All Tasks', path:'/tasks', name: 'All'},
  { icon: <CalendarTodayIcon />, label: 'Today', path:'/tasks/today' , name:'Today'},
  { icon: <StarIcon />, label: 'Important', path:'/tasks/important', name:'Important' },
  { icon: <EventIcon />, label: 'Planned', path:'/tasks/planned', name:'Planned' },
  { icon: <PersonIcon />, label: 'Assigned to me', path:'/tasks/my', name:'My' }
];

const profileMenuItems = [
  { label: 'My Profile' },
  { label: 'Logout' },
];

const tasks = [
  {name: 'Buy groceries', completed: false, reminder:false, date:'', repeat: false, favorite: false, createdDate: new Date() + ''},
  {name: 'Finish project report', completed: false, reminder:false, date:'', repeat: false, favorite: true, createdDate: 'Fri Jan 20 2025 15:28:05 GMT+0530 (India Standard Time)'},
  {name: 'Call the bank', completed: false, reminder:false, date:'', repeat: false, favorite: false, createdDate: 'Fri Jan 21 2025 15:28:05 GMT+0530 (India Standard Time)'},
  {name: 'Schedule dentist appointment', completed: false, reminder:false, date:'', repeat: false, favorite: false, createdDate: 'Fri Jan 22 2025 15:28:05 GMT+0530 (India Standard Time)'},
  {name: 'Plan weekend trip', completed: false, reminder:false, date:'', repeat: false, favorite: false, createdDate: 'Fri Jan 23 2025 15:28:05 GMT+0530 (India Standard Time)'},

  {name: 'Read a book', completed: true, reminder:false, date:'', repeat: false, favorite: false, createdDate: new Date() + ''},
  {name: 'Clean the house', completed: true, reminder:false, date:'', repeat: false, favorite: false, createdDate: 'Fri Jan 19 2025 15:28:05 GMT+0530 (India Standard Time)'},
  {name: 'Prepare presentation', completed: true, reminder:false, date:'', repeat: false, favorite: false, createdDate: 'Fri Jan 18 2025 15:28:05 GMT+0530 (India Standard Time)'},
  {name: 'Update blog', completed: true, reminder:false, date:'', repeat: false, favorite: false, createdDate: 'Fri Jan 20 2025 15:28:05 GMT+0530 (India Standard Time)'},
].reverse();

const taskTemplate = {name:'', completed: false, reminder:false, date:'', repeat: false, favorite: false, createdDate: new Date() + ''};

export const TodoApp = (props) => {
  let localTasks = localStorage.getItem('user_tasks');
  if(!localTasks) {
    localStorage.setItem('user_tasks', JSON.stringify(tasks));
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemDrawer, openCloseItemDrawer] = useState(false);
  const [globleTaskList, setGlobleTasksList] = useState(localTasks? JSON.parse(localTasks) : tasks);
  const [taskList, setTasksList] = useState([]);
  const [taskInput, setTaskInput] = useState(taskTemplate);
  const [updateData, setUpdateData] = useState(null);
  const location = useLocation();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    if(event.currentTarget.innerText === 'Logout'){
      localStorage.removeItem('user');
      props.setAuthenticated(false);
    }
  };
  
  const saveTasksList = (list) => {
    setTasksList(list);
    document.body.style.cssText = '--completed-percent: '+(((list.filter(t=>t.completed).length/list.length)*100)|0)+'%';
    let data = localStorage.getItem('user_tasks');
    let localData = data? JSON.parse(data) : [];
    list = Array.from([...localData, ...list]
        .reduce((m, o) => m.set(o.name, o), new Map())
        .values()
    );
    setGlobleTasksList(list);
    localStorage.setItem('user_tasks', JSON.stringify(list));
  }

  const deleteTaskFromList = (name) => {
    let list = [...taskList];
    list = list.filter((item) => item.name !== name);
    setTasksList(list);
    document.body.style.cssText = '--completed-percent: '+(((list.filter(t=>t.completed).length/list.length)*100)|0)+'%';
    let data = localStorage.getItem('user_tasks');
    let localData = data? JSON.parse(data) : [];
    list = Array.from([...localData, ...list]
        .reduce((m, o) => m.set(o.name, o), new Map())
        .values()
    );
    list = list.filter((item) => item.name !== name);
    setGlobleTasksList(list);
    localStorage.setItem('user_tasks', JSON.stringify(list));
  }

  const updateTaskData = (data) => {
    let list = Array.from([...taskList, data]
        .reduce((m, o) => m.set(o.name, o), new Map())
        .values()
    );
    saveTasksList(list);
  }

  const setTaskData = (task, key, value) => {
    let temp = [...taskList];
    let index = temp.findIndex(t=> t.name===task);
    temp[index][key] = value;
    saveTasksList(temp)
  }

  const setTaskInputValue = (key, value) => {
    setTaskInput(prev => ({...prev, [key]: value}));
  }

  const addNewTask = () => {
    console.log(taskInput);
    if(taskInput.name && taskInput.name.length<3){
      alert('Input is required');
      return;
    }

    let temp = [...taskList];
    temp.createdDate = new Date() + '';
    temp.push(taskInput)
    console.log(temp)
    saveTasksList(temp)
    setTaskInput(taskTemplate);
  }

  useEffect(()=> {
    let temp = [...globleTaskList];
    if(location.pathname === '/tasks/today'){
      temp = temp.filter(t=>new Date(t.createdDate).setHours(0,0,0,0) === new Date().setHours(0,0,0,0));
    } 
    else if(location.pathname === '/tasks/important'){
      temp = temp.filter(t=>t.favorite);
    }
    else if(location.pathname === '/tasks/planned'){
      temp = temp.filter(t=>!t.completed && t.date!=='');
    }
    setTasksList(temp)
    console.log(document.getElementById('chart'))
    console.log(temp.filter(t=>t.completed === true).length)
    document.body.style.cssText = '--completed-percent: '+(((temp.filter(t=>t.completed).length/temp.length)*100)|0)+'%';
  }, [location.pathname])

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <CheckBoxIcon className={styles.logoIcon} />
          <div className={styles.logoText}>DoIt</div>
        </div>
        <div className={styles.headerActions}>
          <IconButton><SearchIcon /></IconButton>
          <IconButton><AppsIcon /></IconButton>
          <IconButton><DarkModeIcon /></IconButton>
        </div>
      </nav>

      <div className={styles.mainContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.profileSection} onClick={(e)=> handleProfileClick(e)}>
            <img src="/avatar.png" alt="Profile" className={styles.profileImage} />
            <div className={styles.profileName}>Hey, ABCD</div>
          </div>
          
          <div className={styles.menuSection}>
            {menuItems.map((item, index) => (
              <NavLink to={item.path} key={index} style={{ textDecoration: 'none' }}>
                <MenuItem key={index} {...item} active={location.pathname === item.path} />
            </NavLink>
            ))}
          </div>
          
          <div className={styles.addListMenuItem}>
            <AddIcon />
            <span>Add list</span>
          </div>
          
          <div className={styles.statsSection}>
            <div className={styles.statsTitle}>{menuItems.filter(i=>i.path===location.pathname)[0].name} Tasks</div>
            <div className={styles.statsNumber}>{taskList.length}</div>
            <div className={styles.donutChart}/>
            <div className={styles.statsLegend}>
              <div><span style={{color:'#cddccf'}}>◉</span> Pending</div>
              <div><span style={{color:'#3f9142'}}>◉</span> Done</div>
            </div>
          </div>
        </aside>
        
        <main className={styles.mainContent} style={itemDrawer?{} : {paddingRight: '36px'}}>
          <div className={styles.taskHeader}>
            <div className={styles.taskTitle}>To Do</div>
            <IconButton><ArrowDropDown /></IconButton>
          </div>
          
          <div className={styles.addTaskSection}>
            <TextareaAutosize minRows={2} 
              placeholder="Add A Task" 
              className={styles.addTaskTextArea} 
              value={taskInput.name}
              onChange={(e) => setTaskInputValue('name', e.target.value)}
            />
            <div className={styles.taskActions}>
              <div className={styles.taskIcons}>
                <IconButton onClick={(e) => setTaskInputValue('reminder', !taskInput.reminder)} style={taskInput.reminder?{color: 'green', background: 'rgb(186 212 188)'}:{}}><NotificationsIcon /></IconButton>
                <IconButton onClick={(e) => setTaskInputValue('repeat', !taskInput.repeat)} style={taskInput.repeat?{color: 'green', background: 'rgb(186 212 188)'}:{}}><RepeatIcon /></IconButton>
                {/* <IconButton><CalendarTodayIcon /></IconButton> */}
                <PickerWithButtonField setValue={(value) => setTaskInputValue('date', value)} value={taskInput.date} page='ToDoApp'/>
              </div>
              <button className={styles.addTaskButton} onClick={()=> addNewTask()}>ADD TASK</button>
            </div>
          </div>
          
          <div className={styles.taskList}>
            {taskList?.filter(t=>!t.completed).reverse().map((task, index) => (
              <TaskItem key={index} 
                task={task} 
                setStatus={(key, value)=>setTaskData(task.name, key, value)}
                openCloseItemDrawer={()=>openCloseItemDrawer(true)}
                updateData={(data)=>setUpdateData(data)}
              />
            ))}
          </div>
          
          <div className={styles.completedSection}>
            <div className={styles.completedHeader}>Completed</div>
            <div className={styles.taskList}>
              {taskList?.filter(t=>t.completed).reverse().map((task, index) => (
                <TaskItem key={index} 
                  task={task} 
                  setStatus={(key, value)=>setTaskData(task.name, key, value)}
                  openCloseItemDrawer={()=>openCloseItemDrawer(true)}
                  updateData={(data)=>setUpdateData(data)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>


      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{  
            style: {  
              padding: 5,
            },  
         }} 
        >
          {profileMenuItems.map((item, index) => (
              <MenuItem key={index} onClickHandle={(e)=>handleClose(e)} {...item}/>
            ))}
        </Menu>

        {itemDrawer && 
          <TaskManager openCloseItemDrawer={()=>openCloseItemDrawer(!itemDrawer)} 
            data={updateData} updateTaskData={updateTaskData} deleteTaskFromList={deleteTaskFromList}/> 
        }
    </div>
  );
};