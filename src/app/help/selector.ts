import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { AuthStateInterface } from './authState.interface';
export const selectUser = (state:AppState) => state.auth

export const isSubmittingSelector = createSelector(
    selectUser,
    (state:AuthStateInterface)=>state.isSubmitting
)