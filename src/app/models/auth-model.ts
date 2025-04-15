export interface IAuthModel {
    userId?: string | null;
    userName?: string;
    accountName?: string;
    token?: string;
    role?: number | null;
  }
  export const INIT_AUTH_MODEL: IAuthModel = {
    userId: '',
    userName: '',
    accountName: '',
    token: '',
    role: null
  };