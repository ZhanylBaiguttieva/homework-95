
import { useAppDispatch } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { CocktailMutation } from '../../../types';
import { createCocktail } from '../cocktailsThunk.ts';
import CocktailForm from './CocktailForm.tsx';
import { Typography } from '@mui/material';

const NewCocktail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (cocktailMutation: CocktailMutation) => {
    await dispatch(createCocktail(cocktailMutation)).unwrap();
    navigate('/');
  };
  return (
    <>
      <Typography variant="h4">New Cocktail</Typography>
      <CocktailForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewCocktail;