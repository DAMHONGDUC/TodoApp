import {ILoginRequest} from './auth-model';
import {getAPI} from 'helper/network';

const endpoint = {
  login: '/users/1'.trim(),
};

export const AuthService = {
  signIn: async (req: ILoginRequest) => {
    const res = await getAPI(endpoint.login);

    if (res?.data) {
      const userInfo = res.data;

      return userInfo.email === req.username &&
        userInfo.password === req.password
        ? userInfo
        : undefined;
    }
  },
};
