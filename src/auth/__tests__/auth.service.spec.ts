import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { UserEntityMock } from '../../user/__mocks__/user.mock';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { loginUserMock } from '../__mock__/login-user.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
import { jwtMock } from '../__mock__/jwt.mock';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(UserEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      acessToken: jwtMock,
      user: new ReturnUserDto(UserEntityMock),
    });
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      service.login({ ...loginUserMock, password: '4251' }),
    ).rejects.toThrowError();
  });

  it('should return user if email not exist', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(undefined);
    expect(service.login(loginUserMock)).rejects.toThrowError();
  });

  it('should return error in userService', async () => {
    jest
      .spyOn(userService, 'findUserByEmail')
      .mockRejectedValueOnce(new Error());
    expect(service.login(loginUserMock)).rejects.toThrowError();
  });
});
