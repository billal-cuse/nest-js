import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';

@Injectable()
export class AppService {

  get() {
    return "Hello comgratulation this is final test"
  }

}
