import { Cocktail } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createCocktail, fetchCocktails } from './cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface CocktailsState {
  items: Cocktail[];
  fetching: boolean;
  creating: boolean;
}

const initialState: CocktailsState = {
  items: [],
  fetching: false,
  creating: false,
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
    builder.addCase(createCocktail.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createCocktail.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createCocktail.rejected, (state) => {
      state.creating = false;
    });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsFetching = (state: RootState) => state.cocktails.fetching;
export const selectCocktailCreating = (state:RootState) => state.cocktails.creating;

