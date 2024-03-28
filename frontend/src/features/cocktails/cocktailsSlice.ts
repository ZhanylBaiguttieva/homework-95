import { Cocktail } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCocktails } from './cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface CocktailsState {
  items: Cocktail[];
  fetching: boolean;
}

const initialState: CocktailsState = {
  items: [],
  fetching: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchCocktails.fulfilled, (state, {payload: cocktails}) => {
      state.fetching = false;
      state.items = cocktails;
    });
    builder.addCase(fetchCocktails.rejected, (state) => {
      state.fetching = false;
    });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsFetching = (state: RootState) => state.cocktails.fetching;

