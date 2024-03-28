import React from 'react';
import { Cocktail } from '../../../types';
import { Card, CardContent, CardMedia, Divider, Grid, styled, Typography } from '@mui/material';
import { apiURL } from '../../../constants.ts';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  cocktail: Cocktail;
}
const CocktailItem: React.FC<Props> = ({cocktail}) => {

  let cardImage;
  if (cocktail.image) {
    cardImage = apiURL + '/' + cocktail.image;
  }
  return (
    <Grid sm md={6} lg={4}>
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
      </Card>
    </Grid>
  );
};

export default CocktailItem;