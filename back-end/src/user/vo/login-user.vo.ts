import { ObjectId } from 'typeorm';
interface UserInfo {
  _id: ObjectId;
  account: string;
  password: string;
  nickName: string;
  email: string;
  createTime: Date;
}
export class LoginUserVo {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}
