import { BehaviorSubject } from "rxjs";
import { AuthState } from "../../types/auth";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const auth$ = new BehaviorSubject<AuthState>(initialState);

export const setAuth = (state: AuthState) => {
  auth$.next(state);
};

export const logout = () => {
  auth$.next(initialState);
};