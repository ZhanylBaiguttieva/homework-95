import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Ingredient } from '../../../types';

interface Props {
  setString: (ingredients: Ingredient[]) => void;
}
const IngredientForm: React.FC<Props> = ({setString}) => {
  const [state, setState] = useState<Ingredient[]>([{
    name: '',
    quantity:  '',
  }]);

  const formChangeHandler = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let data = [...state];
    const key = event.target.name as keyof Ingredient;
    data[index][key] = event.target.value;
    setState(data);
    setString(state);
  };

  const deleteByIndex = (index: number) => {
    let data = [...state];
    data.splice(index,1);
    setState(data);
  };

  return (
    <Grid>
      {state.map((field, index) => (
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" key={index} m={2}>
          <Grid item xs>
            <TextField
              id="name" label='Name'
              value={field.name}
              onChange={(event) => formChangeHandler(index,event)}
              name="name"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="quantity" label="Quantity"
              value={field.quantity}
              onChange={(event) => formChangeHandler(index,event)}
              name="quantity"
              required
            />
          </Grid>
          <Grid item xs>
            <Button onClick={()=> deleteByIndex(index)}>Delete</Button>
          </Grid>
        </Grid>
      ))}
      <Grid>
        <Button onClick={() => {setState([...state,{name:'',quantity:''}])}}>Add new ingredient</Button>
      </Grid>
    </Grid>
  );
};

export default IngredientForm;