import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './LoginPage.module.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(8),
  backgroundColor: '#fbfdfc',
}));

export const LoginPage = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(credentials.email === 'admin@gmail.com'){
      props.setAuthenticated(true);
      localStorage.setItem('user', credentials.email);
    } else {
      alert('Bad Credentials');
    }
  };

  useEffect(()=> {
    if(localStorage.getItem('user') === 'admin@gmail.com'){
      props.setAuthenticated(true);
    }
  }, [props]);

  return (
    <Box className={styles.loginContainer}>
      <StyledPaper elevation={3}>
        <Box className={styles.logoContainer}>
          <CheckBoxIcon className={styles.logoIcon} />
          <Typography variant="h4" className={styles.logoText}>
            DoIt
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
            className={styles.textField}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            className={styles.textField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={styles.submitButton}
            sx={{
              marginTop: '24px',
              backgroundColor: '#3f9142',
              '&:hover': {
                backgroundColor: '#357937'
              }
            }}
          >
            Sign In
          </Button>
        </form>
        <p style={{marginTop:'20px'}}>Use admin@gmail.com/123 for demo</p>
      </StyledPaper>
    </Box>
  );
};