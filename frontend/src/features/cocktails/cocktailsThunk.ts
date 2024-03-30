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

export const fetchMyCocktails = createAsyncThunk<Cocktail[], string>(
  'cocktails/fetchMy',
  async(userId) => {
    const response = await axiosApi.get('/cocktails?userId=' + userId);
    return response.data;
  }
);

export const fetchOneCocktail = createAsyncThunk<Cocktail| null, string>(
  'cocktails/fetchOne',
  async(cocktailId) => {
    const cocktailResponse = await axiosApi.get<Cocktail | null>('/cocktails/' +  cocktailId);
    if(!cocktailResponse) {
      return null;
    }
    return cocktailResponse.data;
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

export const deleteCocktail = createAsyncThunk<void,string>(
  'cocktails/delete',
  async(cocktailId) => {
    return await axiosApi.delete('/cocktails/' + cocktailId);
  }
);

export const publishCocktail = createAsyncThunk<void, string>(
  'cocktails/publish',
  async(cocktailId) => {

    return await axiosApi.patch(  `/cocktails/${cocktailId}/togglePublished`);
  }
);