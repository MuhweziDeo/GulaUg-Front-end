import { Store, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './rootReducer';

export interface IAuth {
    isAuthenticated: boolean;
    username: string;
    image?: string;
    isAdmin: boolean;
}
export interface IAppState {
    user: IAuth;
}

export const store: Store<IAppState> = createStore(
    rootReducer,
    applyMiddleware(createLogger()),
  );
