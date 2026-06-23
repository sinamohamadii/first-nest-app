import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { type Coffees } from './entities/coffees.entity';

@Controller('Coffees')
export class CoffeesController {
  // we need to inject the CoffeesService into the controller so that we can use its methods to handle requests.
  // private -> only accessible for this class. readonly -> so we cannot change the value of this service
  constructor(private readonly CoffeesService: CoffeesService) {}

  // The @Get() decorator is used to define a route handler for the HTTP GET method. When a GET request is made to the /Coffees endpoint, the find() method will be called and its return value will be sent back to the client as the response.
  @Get()
  find() {
    return this.CoffeesService.findAll();
  }

  // Query Params
  // @Get('query')
  // findPage(@Query() paginationQuery) {
  //   const { limit, offset } = paginationQuery;
  //   return `This action returns all Coffees with limit: ${limit} and offset: ${offset}`;
  // }

  // Param decorator is used to extract the value of the id parameter from the URL path. The id parameter is defined in the route path as :id, which means that it can be any value. The value of the id parameter is then passed to the findOne method as an argument.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CoffeesService.findOne(id);
  }

  // Accessing the body payload
  @Post()
  create(@Body() body: Coffees) {
    return this.CoffeesService.create(body);
  }

  // Nested Route
  // @Post('nice')
  // // Http code that we determine
  // @HttpCode(HttpStatus.GONE)
  // findAll() {
  //   return 'This action returns all Coffees';
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.CoffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CoffeesService.remove(id);
  }
}
