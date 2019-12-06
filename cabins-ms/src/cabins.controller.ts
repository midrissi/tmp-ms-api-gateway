import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

interface ICabin {
  name: string;
}

@Controller()
export class CabinsCtrl {
  constructor() {}

  @MessagePattern('cabins:create')
  async create(data: ICabin): Promise<boolean> {
    return true;
  }
}
