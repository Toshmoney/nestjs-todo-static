import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    private todos = [
        {
            id: 1,
            title: 'Buy groceries',
            description: 'Milk, Bread, Cheese',
            isCompleted: true
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

    findAll(isCompleted?: boolean | string) {
        if (isCompleted === undefined || isCompleted === null || isCompleted === '') {
            return this.todos;
        }

        // Convert string inputs ("true" or "false") into actual booleans
        let completedBool: boolean;
        
        if (typeof isCompleted === 'string') {
            if (isCompleted === 'true') completedBool = true;
            else if (isCompleted === 'false') completedBool = false;
            else {
                // Throws a 400 Bad Request if the string is not "true" or "false"
                throw new BadRequestException('Invalid query parameter: isCompleted must be "true" or "false"');
            }
        } else {
            completedBool = isCompleted;
        }

        return this.todos.filter(todo => todo.isCompleted === completedBool);
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
