import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffees } from './entities/coffees.entity';

@Module({
  // Import the Coffees entity into the ORM module is required to register the entity
  imports: [TypeOrmModule.forFeature([Coffees])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
