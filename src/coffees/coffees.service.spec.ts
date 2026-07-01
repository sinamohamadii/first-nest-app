import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Coffees } from './entities/coffees.entity';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let flavorRepository: MockRepository<Flavor>;
  let coffeesRepository: MockRepository<Coffees>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: { createQueryRunner: jest.fn() } },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('localhost') },
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository<Flavor>(),
        },
        {
          provide: getRepositoryToken(Coffees),
          useValue: createMockRepository<Coffees>(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeesRepository = module.get<MockRepository<Coffees>>(
      getRepositoryToken(Coffees),
    );
    flavorRepository = module.get<MockRepository<Flavor>>(
      getRepositoryToken(Flavor),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};
        coffeesRepository.findOne.mockResolvedValue(expectedCoffee);
        const result = await service.findOne(coffeeId);
        expect(result).toEqual(expectedCoffee);
      });
    });

    describe('when coffee with ID does not exist', () => {
      it('should return undefined', async () => {});
    });
  });
});
