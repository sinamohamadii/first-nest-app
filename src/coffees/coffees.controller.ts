import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpCode,
  // HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  // SetMetadata,
  //  Query,
  // UsePipes,
  // ValidationPipe,
  // UseGaurd, ...
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
// import { type Coffees } from './entities/coffees.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

// A controller pipe binding:
//@UsePipes(ValidationPipe)
@ApiTags('coffees')
@Controller('Coffees')
export class CoffeesController {
  // we need to inject the CoffeesService into the controller so that we can use its methods to handle requests.
  // private -> only accessible for this class. readonly -> so we cannot change the value of this service
  constructor(private readonly CoffeesService: CoffeesService) {}

  // The @Get() decorator is used to define a route handler for the HTTP GET method. When a GET request is made to the /Coffees endpoint, the find() method will be called and its return value will be sent back to the client as the response.
  // A method-level pipe binding:
  // @UsePipes(ValidationPipe)
  // @SetMetadata('isPublic', true) // This is a custom decorator that we can use to mark this route as public. We can then use this metadata in our guards to allow or deny access to this route.
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  find(@Query() paginationQuery: PaginationQueryDto) {
    return this.CoffeesService.findAll(paginationQuery);
  }

  // Query Params
  // @Get('query')
  // findPage(@Query() paginationQuery) {
  //   const { limit, offset } = paginationQuery;
  //   return `This action returns all Coffees with limit: ${limit} and offset: ${offset}`;
  // }

  // Param decorator is used to extract the value of the id parameter from the URL path. The id parameter is defined in the route path as :id, which means that it can be any value. The value of the id parameter is then passed to the findOne method as an argument.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.CoffeesService.findOne(id);
  }

  // Accessing the body payload
  @Post()
  create(@Body() CreateCoffeeDto: CreateCoffeeDto) {
    return this.CoffeesService.create(CreateCoffeeDto);
  }

  // Nested Route
  // @Post('nice')
  // // Http code that we determine
  // @HttpCode(HttpStatus.GONE)
  // findAll() {
  //   return 'This action returns all Coffees';
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(/* We can use "ValidationPipe" to have a pipe bound to a parameter */)
    UpdateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.CoffeesService.update(id, UpdateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CoffeesService.remove(id);
  }
}
