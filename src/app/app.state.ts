import { User } from './model/User';

export interface AppState {
  readonly session: User[];
}
