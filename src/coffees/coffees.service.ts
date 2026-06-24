import {
  // HttpStatus,
  // HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffees } from './entities/coffees.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private Coffeess: Coffees[] = [
    {
      id: 1,
      name: 'Coffees',
      brand: 'Coffees Inc.',
      flavors: ['Vanilla', 'Chocolate', 'Caramel'],
    },
  ];

  findAll(): Coffees[] {
    return this.Coffeess;
  }

  findOne(id: string): Coffees | undefined {
    const coffee = this.Coffeess.find((item) => item.id === +id);
    if (!coffee) {
      // throw new HttpException(
      //   `Coffee with ID ${id} not found`,
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Coffees {
    const coffee: Coffees = {
      id: this.Coffeess.length + 1,
      ...createCoffeeDto,
    };

    this.Coffeess.push(coffee);
    return coffee;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto): Coffees {
    const index = this.Coffeess.findIndex((item) => item.id === +id);

    if (index === -1) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    this.Coffeess[index] = {
      ...this.Coffeess[index],
      ...updateCoffeeDto,
    };

    return this.Coffeess[index];
  }

  remove(id: string) {
    const index = this.Coffeess.findIndex((item) => item.id === +id);
    this.Coffeess.splice(index, 1);
  }
}
