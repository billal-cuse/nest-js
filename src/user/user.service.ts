import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number) {

    const user =  await this.prisma.user.findUnique({ where: { id } });
    if(!user) throw new Error("User not found")

    return user
  }

  async getUserByEmail(email: string) {

    return this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  async getUsers(){
    return this.prisma.user.findMany()
}



async createUser(email: string, name: string){
    return this.prisma.user.create({
      data: {
        email,
        name
      }
    })
}

async updateUser(id: number, email: string, name: string){
    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email
      }
    })
}

async deleteUser(id:number) {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
}
}