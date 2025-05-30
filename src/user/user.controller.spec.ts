import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import * as module from 'node:module';


describe('UserController', () => {
  let controller: UserController;
  const mockData = {
    email: "billal@email.com",
    name : "billal"
  }

  const mockService = {
    createUser: jest.fn((email: string, name: string) => Promise.resolve({id: Date.now(), email, name})),
    updateUser: jest.fn((dto:User) => Promise.resolve({...dto})),
    deleteUser: jest.fn((dto:User) => Promise.resolve({...dto})),
  }

  beforeEach(async () => {
    const module :TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{provide: UserService, useValue: mockService}]
    }).compile()
    controller = module.get<UserController>(UserController)
  })

  it("should create user", async () => {
    const user = await controller.create(mockData)
    console.log(user)
    expect(user).toEqual({
      id: expect.any(Number) as number,
      email: mockData.email,
      name: mockData.name,
    })
    expect(mockService.createUser).toHaveBeenCalledWith(mockData.email, mockData.name)
  })


})