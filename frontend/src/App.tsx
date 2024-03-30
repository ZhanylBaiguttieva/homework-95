import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Cocktails from './features/cocktails/components/Cocktails.tsx';
import ToolBar from './UI/ToolBar.tsx';
import NewCocktail from './features/cocktails/components/NewCocktail.tsx';
import Mine from './features/cocktails/components/Mine.tsx';
import OneCocktail from './features/cocktails/components/OneCocktail.tsx';

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
            <Route path="/mycocktails" element={<Mine/>}></Route>
            <Route path="/cocktails/new" element={<NewCocktail />}></Route>
            <Route path="/cocktails/:id" element={<OneCocktail />}></Route>
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
