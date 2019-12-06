import { Controller, Post, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppCtrl {
  constructor(
    @Inject('MATH_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(data: any) {
    return this.client.send('cabins:create', {});
  }
}
