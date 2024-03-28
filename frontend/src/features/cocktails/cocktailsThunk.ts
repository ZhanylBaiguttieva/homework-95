import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  'cocktails/fetch',
  async() => {
    const response = await axiosApi.get('/cocktails');
    return response.data;
  }
)