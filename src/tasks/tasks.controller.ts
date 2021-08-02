import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Render,
} from '@nestjs/common';
import { Task } from './dto/task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTaskDTO';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Get()
  getTask(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.delteTask(id);
  }
}
