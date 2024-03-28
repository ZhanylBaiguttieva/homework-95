import React from 'react';
import { Cocktail } from '../../../types';
import { Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
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
    <Grid container>
      <Grid item xs={8}>
        <Card sx={{ maxWidth: 345 }}>
          <ImageCardMedia image={cardImage}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {cocktail.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingredients:
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body2" color="text.secondary">
          Recipe: {cocktail.recipe}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CocktailItem;