export interface User {
  id: string;
  username: string;
  email: string;
  createAt: any;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInData {
  email: string;
  password: string;
}
