import { HttpStatus, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Coffees } from './entities/coffees.entity';

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

  create(coffee: Coffees) {
    this.Coffeess.push(coffee);
  }

  update(id: string, coffee: Coffees) {
    const index = this.Coffeess.findIndex((item) => item.id === +id);
    this.Coffeess[index] = coffee;
  }

  remove(id: string) {
    const index = this.Coffeess.findIndex((item) => item.id === +id);
    this.Coffeess.splice(index, 1);
  }
}
