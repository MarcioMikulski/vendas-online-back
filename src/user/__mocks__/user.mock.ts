import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const UserEntityMock: UserEntity = {
  cpf: '12345678910',
  createdAt: new Date(),
  email: 'mugemikulski@gmail.com',
  id: 1,
  name: 'Mugem',
  password: '$2b$10$xUg0ZIMKfMfE38SGSWQUQOH7BGPuw2jlmlifqFUcXkYHh/mOgpGSW',
  phone: '982655463',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
