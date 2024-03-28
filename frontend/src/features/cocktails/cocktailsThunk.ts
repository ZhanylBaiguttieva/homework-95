import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  'cocktails/fetch',
  async() => {
    const response = await axiosApi.get('/cocktails');
    return response.data;
  }
);

export const createCocktail = createAsyncThunk<void, CocktailMutation>(
  'cocktails/create',
  async(cocktailMutation) => {

    const formData = new FormData();

    const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];
    keys.forEach(key => {
      const value = cocktailMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    return await axiosApi.post('/cocktails', formData);
  }
)
