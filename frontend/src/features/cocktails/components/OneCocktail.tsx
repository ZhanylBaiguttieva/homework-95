import { useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  styled,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { selectDeletingCocktail, selectOneCocktail } from '../cocktailsSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCocktail, fetchCocktails, fetchOneCocktail, publishCocktail } from '../cocktailsThunk.ts';
import { apiURL } from '../../../constants.ts';
import { LoadingButton } from '@mui/lab';
const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const OneCocktail = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectDeletingCocktail);
  const cocktail = useAppSelector(selectOneCocktail);
  const navigate = useNavigate();
  const {id} = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchOneCocktail(id));
  }, [dispatch, id]);

  const removeCocktail = async() => {
    await dispatch(deleteCocktail(id));
    await dispatch(fetchCocktails());
    navigate('/');
  };
  const makePublishedCocktail = async () => {
    await dispatch(publishCocktail(id));
    await dispatch(fetchCocktails());
    navigate('/');
  };


  let cardImage;
  if (cocktail?.image) {
    cardImage = apiURL + '/' + cocktail?.image;
  }
  return (
    <Grid item sm md={6} lg={4} m={1}>
      <Card sx={{ maxWidth: 345}}>
        <ImageCardMedia image={cardImage}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cocktail?.name}
          </Typography>
          <Typography>
            <Divider textAlign="left"> <b>Ingredients:</b></Divider>
            {cocktail?.ingredients.map((ingredient, index) => (
              <Typography key={index}>{ingredient.name}: {ingredient.quantity}</Typography>
            ))}
          </Typography>
          <Divider textAlign="left"><b>Recipe:</b></Divider>
          <Typography variant="body2" color="text.secondary">
            {cocktail?.recipe}
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
            {user?.role === 'admin' && cocktail?.isPublished === false && (
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

export default OneCocktail;