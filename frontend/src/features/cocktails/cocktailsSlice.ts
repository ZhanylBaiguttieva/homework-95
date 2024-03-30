import { Cocktail } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createCocktail, deleteCocktail, fetchCocktails, fetchOneCocktail } from './cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface CocktailsState {
  items: Cocktail[];
  cocktail: Cocktail | null;
  fetching: boolean;
  fetchingOneCocktail: boolean;
  creating: boolean;
  deleteLoading: boolean;
}

const initialState: CocktailsState = {
  items: [],
  cocktail: null,
  fetching: false,
  fetchingOneCocktail: false,
  creating: false,
  deleteLoading: false,
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

    builder.addCase(fetchOneCocktail.pending, (state) => {
      state.fetchingOneCocktail = true;
    });
    builder.addCase(fetchOneCocktail.fulfilled, (state, {payload: cocktail}) => {
      state.fetchingOneCocktail = false;
      state.cocktail = cocktail;
    });
    builder.addCase(fetchOneCocktail.rejected, (state) => {
      state.fetchingOneCocktail = false;
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

    builder.addCase(deleteCocktail.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteCocktail.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCocktail.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;

export const selectOneCocktail = (state: RootState) => state.cocktails.cocktail;
export const selectCocktailCreating = (state:RootState) => state.cocktails.creating;
export const selectDeletingCocktail = (state: RootState) => state.cocktails.deleteLoading;

