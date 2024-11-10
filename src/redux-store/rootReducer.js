// Reducers
import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth';

export const reducerMappingList = {
  auth
};

export const rootReducer = combineReducers(reducerMappingList);
