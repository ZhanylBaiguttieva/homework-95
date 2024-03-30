import React from 'react';
import { Cocktail } from '../../../types';
import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, styled, Typography } from '@mui/material';
import { apiURL } from '../../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { selectDeletingCocktail } from '../cocktailsSlice.ts';
import { useNavigate } from 'react-router-dom';
import { deleteCocktail, fetchCocktails, publishCocktail } from '../cocktailsThunk.ts';
import { LoadingButton } from '@mui/lab';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  cocktail: Cocktail;
}
const CocktailItem: React.FC<Props> = ({cocktail}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectDeletingCocktail);
  const navigate = useNavigate();
  const removeCocktail = async() => {
    await dispatch(deleteCocktail(cocktail._id));
    await dispatch(fetchCocktails());
    navigate('/');
  };
  const makePublishedCocktail = async () => {
    await dispatch(publishCocktail(cocktail._id));
    await dispatch(fetchCocktails());
  };

  let cardImage;
  if (cocktail.image) {
    cardImage = apiURL + '/' + cocktail.image;
  }
  return (
    <Grid sm md={6} lg={4} m={1}>
      <Card sx={{ maxWidth: 345}}>
        <ImageCardMedia image={cardImage}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cocktail.name}
          </Typography>
          <Typography>
            <Divider textAlign="left"> <b>Ingredients:</b></Divider>
            {cocktail.ingredients.map(ingredient => (
              <Typography>{ingredient.name}: {ingredient.quantity}</Typography>
            ))}
          </Typography>
          <Divider textAlign="left"><b>Recipe:</b></Divider>
          <Typography variant="body2" color="text.secondary">
            {cocktail.recipe}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            {user?.role === 'admin' && (
              <Grid item>
                <LoadingButton
                  color="primary"
                  onClick={removeCocktail}
                  loading={isDeleting}
                  disabled={isDeleting}
                >
                  Delete
                </LoadingButton>
              </Grid>
            )}
            {user?.role === 'admin' && cocktail.isPublished === false && (
              <Grid item>
                <Button
                  color="primary"
                  onClick={makePublishedCocktail}
                >
                  Publish
                </Button>
              </Grid>
            )}
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CocktailItem;