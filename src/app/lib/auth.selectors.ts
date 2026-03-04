import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";


export const AUTH_FEATURE_KEY = 'auth';

export const selectAuthFeatureSelector = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsAuthenticated = createSelector(selectAuthFeatureSelector, state => state.isAuthenticated);

export const selectToken = createSelector(selectAuthFeatureSelector, state => state.token);

export const selectIsLoading = createSelector(selectAuthFeatureSelector, state => state.loading);