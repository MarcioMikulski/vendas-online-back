import { cityMock } from '../../city/__mock__/city.mock';
import { AddressEntity } from '../entities/address.entity';
import { UserEntityMock } from '../../user/__mocks__/user.mock';

export const addressMock: AddressEntity = {
  cep: '41770035',
  cityId: cityMock.id,
  complement: 'Casa',
  createdAt: new Date(),
  id: 1,
  numberAddress: 123,
  updatedAt: new Date(),
  userId: UserEntityMock.id,
};
