import { Test, TestingModule } from '@nestjs/testing';
import { UserTasksService } from './user-tasks.service';
import { UserTasksRepository } from './services/user-tasks.repository';

describe('UserTasksService', () => {
  let service: UserTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTasksService, UserTasksRepository],
    }).compile();

    service = module.get<UserTasksService>(UserTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
