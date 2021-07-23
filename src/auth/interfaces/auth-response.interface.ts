import { User } from 'src/users/user.entity';

export interface AuthResponse {
  user: User;
  accessToken: string;
}
