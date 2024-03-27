import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import GuestMenu from './GuestMenu.tsx';
import UserMenu from './UserMenu.tsx';
import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/usersSlice.ts';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const ToolBar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">Music App</Link>
          </Typography>
          { user ?
            (
              <UserMenu user={user}/>
            )
            : (
              <GuestMenu/>
            )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;