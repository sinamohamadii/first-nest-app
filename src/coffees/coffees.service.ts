import {
  // HttpStatus,
  // HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffees } from './entities/coffees.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffees)
    private readonly coffeeRepository: Repository<Coffees>,
  ) {}

  findAll(): Promise<Coffees[]> {
    return this.coffeeRepository.find();
  }

  async findOne(id: string): Promise<Coffees | undefined> {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
    });
    if (!coffee) {
      // throw new HttpException(
      //   `Coffee with ID ${id} not found`,
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Promise<Coffees> {
    const coffee: Coffees = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return this.coffeeRepository.remove(coffee);
  }
}
