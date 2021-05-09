import { ComponentType } from 'react';

export interface LoginLocationState {}
export interface RegisterLocationState {}
export interface ForgotPasswordLocationState {}

export interface HomePageLocationState {}
export interface LocationAnonymousStates {
  '/signin'?: LoginLocationState;
  '/signup'?: RegisterLocationState;
  '/forgot-password'?: ForgotPasswordLocationState;
}

export interface LocationAuthenticatedStates {
  '/'?: HomePageLocationState;
}

export type PathNameAnonymous = keyof LocationAnonymousStates;
export type PathNameAuthenticated = keyof LocationAuthenticatedStates;

export interface PublicPage {
  path: PathNameAnonymous;
  exact?: boolean;
  component: ComponentType;
}

export interface PrivatePage {
  path: PathNameAuthenticated;
  exact?: boolean;
  component: ComponentType;
}

export type Role = 'admin' | 'user';
