import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(UserEntityMock),
            save: jest.fn().mockResolvedValue(UserEntityMock),
            findaAll: jest.fn().mockResolvedValue([UserEntityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', () => {
    const user = service.findUserByEmail(UserEntityMock.email);
    expect(user).resolves.toEqual(UserEntityMock);
  });

  it('should return error in findUserByEmail', () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findUserByEmail(UserEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return error in findUserByEmail (error DB)', () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      service.findUserByEmail(UserEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return user in findUserById', () => {
    const user = service.findUserById(UserEntityMock.id);
    expect(user).resolves.toEqual(UserEntityMock);
  });

  it('should return error in findUserById', () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findUserByEmail(UserEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return error in findUserById (error DB)', () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findUserById(UserEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingRelations', () => {
    const user = service.getUserByIdUsingRelations(UserEntityMock.id);
    expect(user).resolves.toEqual(UserEntityMock);
  });

  it('should return error if user exist ', () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return user if user not exist ', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);
    expect(user).toEqual(UserEntityMock);
  });
});
