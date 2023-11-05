import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { Cache } from 'cache-manager';
import { UserEntityMock } from '../../user/__mocks__/user.mock';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('CacheService', () => {
  let service: CacheService;
  let cache: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => UserEntityMock,
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cache = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data in cache', async () => {
    const user = await service.getCache('key', () => null);
    expect(user).toEqual(UserEntityMock);
  });

  it('should return data in function', async () => {
    const result = { test: 'test' };
    jest.spyOn(cache, 'get').mockResolvedValue(undefined);

    const user = await service.getCache('key', () => Promise.resolve(result));
    expect(user).toEqual(result);
  });
});
