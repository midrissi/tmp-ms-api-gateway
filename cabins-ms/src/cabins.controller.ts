import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICabine, ICabinQueryOpts } from './interfaces/cabine.interface';

@Controller()
export class CabinsCtrl {
  constructor(
    @InjectModel('Cabine') private readonly cabineModel: Model<ICabine>,
  ) {}

  @MessagePattern('cabins:list')
  async list(data: ICabinQueryOpts): Promise<ICabine[]> {
    return await this.cabineModel
      .find(data.$filter || {})
      .limit(data.$top || 10)
      .skip(data.$skip || 0);
  }

  @MessagePattern('cabins:create')
  async create(data: ICabine): Promise<ICabine> {
    const c = new this.cabineModel(data);
    return await c.save({ new: true });
  }
}
