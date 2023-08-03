import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {NashvilleModule} from '../src/nashville.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

    beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NashvilleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    });


    describe('TasksController (POST /tasks)', () => {
        it('should create a task with valid data', () => {
            return request(app.getHttpServer())
                .post('/tasks')
                .send({
                    title: 'Test task',
                    description: 'Test task description'
                })
                .expect(201)
                .then(response => {
                    expect(response.body.title).toEqual('Test task');
                    expect(response.body.description).toEqual('Test task description');
                });
        });

        it('should not create a task with missing data', () => {
            return request(app.getHttpServer())
                .post('/tasks')
                .send({
                    title: 'Test task'
                    // description is missing
                })
                .expect(400)
                .then(response => {
                    expect(response.body.message).toEqual('description must be a string');
                });
        });

        it('should not create a task with invalid data', () => {
            return request(app.getHttpServer())
                .post('/tasks')
                .send({
                    title: 'Test task',
                    description: 123 // description should be a string, not a number
                })
                .expect(400)
                .then(response => {
                    expect(response.body.message).toEqual('description must be a string');
                });
        });
    });

    describe('TasksController (GET /tasks)', () => {
        it('should return tasks with valid pagination', () => {
            return request(app.getHttpServer())
                .get('/tasks?limit=10&offset=0') // assuming there are at least 10 tasks
                .expect(200)
                .then(response => {
                    expect(response.body.length).toEqual(10);
                    response.body.forEach(task => {
                        expect(task.title).toBeDefined();
                        expect(task.description).toBeDefined();
                    });
                });
        });

        it('should return empty array if no tasks', () => {
            return request(app.getHttpServer())
                .get('/tasks?limit=10&offset=9999') // assuming there are less than 9999 tasks
                .expect(200)
                .then(response => {
                    expect(response.body.length).toEqual(0);
                });
        });

        it('should return error with invalid pagination', () => {
            return request(app.getHttpServer())
                .get('/tasks?limit=abc&offset=0') // abc is not a valid limit
                .expect(400)
                .then(response => {
                    expect(response.body.message).toEqual('limit must be a number');
                });
        });
    });

    describe('TasksController (GET /tasks/:id)', () => {
        it('should return a task with valid id', () => {
            return request(app.getHttpServer())
                .get('/tasks/1') // assuming there is a task with id 1
                .expect(200)
                .then(response => {
                    expect(response.body.id).toEqual(1);
                    expect(response.body.title).toBeDefined();
                    expect(response.body.description).toBeDefined();
                });
        });

        it('should not return a task with non-existing id', () => {
            return request(app.getHttpServer())
                .get('/tasks/9999') // assuming there is no task with id 9999
                .expect(404)
                .then(response => {
                    expect(response.body.message).toEqual('Task not found');
                });
        });

        it('should not return a task with invalid id', () => {
            return request(app.getHttpServer())
                .get('/tasks/abc') // abc is not a valid id
                .expect(400)
                .then(response => {
                    expect(response.body.message).toEqual('id must be a number');
                });
        });
    });

    describe('TasksController (PATCH /tasks/:id)', () => {
        it('should update a task with valid id and data', () => {
            return request(app.getHttpServer())
                .patch('/tasks/1') // assuming there is a task with id 1
                .send({
                    title: 'Updated test task',
                    description: 'Updated test task description'
                })
                .expect(200)
                .then(response => {
                    expect(response.body.id).toEqual(1);
                    expect(response.body.title).toEqual('Updated test task');
                    expect(response.body.description).toEqual('Updated test task description');
                });
        });

        it('should not update a task with non-existing id', () => {
            return request(app.getHttpServer())
                .patch('/tasks/9999') // assuming there is no task with id 9999
                .send({
                    title: 'Updated test task',
                    description: 'Updated test task description'
                })
                .expect(404)
                .then(response => {
                    expect(response.body.message).toEqual('Task not found');
                });
        });

        it('should not update a task with invalid data', () => {
            return request(app.getHttpServer())
                .patch('/tasks/1') // assuming there is a task with id 1
                .send({
                    title: 'Updated test task',
                    description: 123 // description should be a string, not a number
                })
                .expect(400)
                .then(response => {
                    expect(response.body.message).toEqual('description must be a string');
                });
        });
    });

    describe('TasksController (DELETE /tasks/:id)', () => {
        it('should delete a task with valid id', () => {
            return request(app.getHttpServer())
                .delete('/tasks/1') // assuming there is a task with id 1
                .expect(204)
                .then(response => {
                    expect(response.body).toEqual({});
                });
        });

        it('should not delete a task with non-existing id', () => {
            return request(app.getHttpServer())
                .delete('/tasks/9999') // assuming there is no task with id 9999
                .expect(404)
                .then(response => {
                    expect(response.body.message).toEqual('Task not found');
                });
        });

        it('should not delete a task with invalid id', () => {
            return request(app.getHttpServer())
                .delete('/tasks/abc') // abc is not a valid id
                .expect(400)
                .then(response => {
                    expect(response.body.message).toEqual('id must be a number');
                });
        });
    });

    afterAll(async () => {
        await app.close();
  });
});
