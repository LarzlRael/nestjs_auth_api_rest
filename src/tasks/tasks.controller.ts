import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Render,
  UseGuards,
} from '@nestjs/common';
import { Task } from './dto/task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDTO';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  getTask(@Query() filterDto: GetTasksFilterDto, @GetUser() user:User): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }



  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.delteTask(id);
  }
}
