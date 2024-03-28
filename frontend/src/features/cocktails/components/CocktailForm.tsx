import { CocktailMutation } from '../../../types';
import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { selectCocktailCreating } from '../cocktailsSlice.ts';
import { Grid, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput.tsx';
import { LoadingButton } from '@mui/lab';

interface Props {
  onSubmit: (mutation: CocktailMutation) => void;
}
const CocktailForm: React.FC<Props> = ({onSubmit}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  if(!user) {
    navigate('/');
  }

  const isCreating = useAppSelector(selectCocktailCreating);
  const [state, setState] = useState<CocktailMutation>({
    userId: '',
    name: '',
    image: null,
    recipe: '',
    ingredients: [],
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name" label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="recipe" label="Recipe"
            value={state.recipe}
            onChange={inputChangeHandler}
            name="recipe"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton type="submit" color="primary" variant="contained" loading={isCreating}>Add
            artist</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CocktailForm;