import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

export class JwtHelper {

  static  getUser() {
    const user =  helper.decodeToken(localStorage.getItem('token'));
    return user;
  }

  static  checkIfAdmin() {
    const { isAdmin } =  JwtHelper.getUser();
    return isAdmin;
  }

}
