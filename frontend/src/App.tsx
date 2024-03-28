import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Cocktails from './features/cocktails/components/Cocktails.tsx';
import ToolBar from './UI/ToolBar.tsx';
import CocktailForm from './features/cocktails/components/CocktailForm.tsx';

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <ToolBar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Cocktails />}></Route>
            <Route path="/cocktails/new" element={<CocktailForm/>}></Route>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
