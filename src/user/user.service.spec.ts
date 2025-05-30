import { UserService } from './user.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;

  const mockUser = {
    id: 1,
    email: 'billal@gmail.com',
    name: 'Billal',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockPrismaService = {
    user: {
      findUnique: jest.fn().mockResolvedValue((dto: User) => ({...dto})),
      findFirst: jest.fn().mockResolvedValue((dto: User) => ({...dto})),
      findMany: jest.fn().mockResolvedValue((dto: User) => ({...dto})),
      create: jest.fn().mockResolvedValue((dto: User) => ({...dto})),
      update: jest.fn().mockResolvedValue((dto: User) => ({...dto})),
      delete: jest.fn().mockResolvedValue((dto: User) => ({...dto})),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

describe('getUserById', () => {
  it('should be return user by id', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(mockUser)
    const result = await service.getUserById(1);
    expect(result).toEqual(mockUser);
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({where: {id: 1}})
  })
  it('should be return error if user not found ', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null)
    // const result = await service.getUserById(1);
    await expect(service.getUserById(1)).rejects.toThrow("User not found");
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({where: {id: 1}})
  })
})

  it("should be return user by email", async () => {
    mockPrismaService.user.findFirst.mockResolvedValue(mockUser)
    const result = await service.getUserByEmail(mockUser.email)
    expect(result).toEqual(mockUser)
    expect(mockPrismaService.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: mockUser.email
      }
    })
  })

  it("should be return all users", async () => {
    mockPrismaService.user.findMany.mockResolvedValue([mockUser])
    const result = await service.getUsers()
    expect(result).toEqual([mockUser])
    expect(mockPrismaService.user.findMany).toHaveBeenCalled()
  })

  it("should create a user ",async () => {
    mockPrismaService.user.create.mockResolvedValue(mockUser);
    const result =await service.createUser(mockUser.email, mockUser.name)


    expect(result.email).toEqual(mockUser.email)
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({data: {
      name: mockUser.name,
        email: mockUser.email
      }})
  })

  it("should be update user by id ",async () => {

    mockPrismaService.user.update.mockResolvedValue(mockUser)

    const result = await service.updateUser(mockUser.id, mockUser.email, mockUser.name)

    expect(result.id).toEqual(mockUser.id)
    expect(result.email).toEqual(mockUser.email)
    expect(result.name).toEqual(mockUser.name)
  })

  it("should be delete user by id", async () => {
    mockPrismaService.user.delete.mockResolvedValue(mockUser)
    const result = await service.deleteUser(mockUser.id)
    expect(result).toBe(mockUser)
    expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
      where: { id: mockUser.id },
    });
  })

})