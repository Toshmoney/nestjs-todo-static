import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    private todos: CreateTodoDto[] = [
        {
            id: 1,
            title: 'Buy groceries',
            description: 'Milk, Bread, Cheese',
            isCompleted: false
        },
        {
            id: 2,
            title: 'Clean the house',
            description: 'Living room, Kitchen',
            isCompleted: false
        },
        {
            id: 3,
            title: 'Finish project',
            description: 'Complete the NestJS project',
            isCompleted: false
        }
    ];

    create(createTodoDto: CreateTodoDto) {
        const newTodo = {
            id: this.todos.length + 1,
            ...createTodoDto
        };
        this.todos.push(newTodo);
        return newTodo;
    }

    findAll(isCompleted?: boolean) {
        if (isCompleted !== undefined) {
            return this.todos.filter(todo => todo.isCompleted === isCompleted);
        }
        return this.todos;
    }

    findOne(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }

    update(id: number, updateTodoDto: UpdateTodoDto) {
        const todo = this.findOne(id);
        Object.assign(todo, updateTodoDto);
        return todo;
    }

    remove(id: number) {
        const todo = this.findOne(id);
        this.todos.splice(this.todos.indexOf(todo), 1);
        return todo;
    }
}
