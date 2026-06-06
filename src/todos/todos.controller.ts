import { Controller, Query } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, ParseIntPipe, ValidationPipe, ParseBoolPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
        return this.todosService.create(createTodoDto);
    }

    @Get()
    findAll(@Query('isCompleted', new ParseBoolPipe({ optional: true })) isCompleted?: boolean) {
        return this.todosService.findAll(isCompleted);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(id, updateTodoDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.remove(id);
    }
}
