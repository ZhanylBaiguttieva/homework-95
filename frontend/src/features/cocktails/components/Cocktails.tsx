import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectCocktails } from '../cocktailsSlice.ts';
import { useEffect } from 'react';
import { fetchCocktails } from '../cocktailsThunk.ts';
import { Grid, Typography } from '@mui/material';
import CocktailItem from './CocktailItem.tsx';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          <strong>
            Cocktails Menu:
          </strong>
        </Typography>
      </Grid>
      <Grid item container justifyContent="flex-start" alignItems="flex-start" direction="row">
        {cocktails.map((cocktail) => (
          <CocktailItem
            key={cocktail._id}
            cocktail={cocktail}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Cocktails;