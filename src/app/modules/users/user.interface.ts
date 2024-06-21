export interface TUser {
  id: string;
  password: string;
  email: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

/* export type NewUser = {
  role: string;
  password: string;
  id: string;
};
 */
