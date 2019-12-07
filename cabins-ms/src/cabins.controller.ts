import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICabine, ICabinQueryOpts } from './interfaces/cabine.interface';

@Controller()
export class CabinsCtrl {
  private readonly logger: Logger = new Logger('CabinCtrl');
  constructor(
    @InjectModel('Cabine') private readonly cabineModel: Model<ICabine>,
  ) {}

  @MessagePattern('cabins:list')
  async list(data: ICabinQueryOpts): Promise<ICabine[]> {
    this.logger.log(`list call. ${JSON.stringify(data)}`);
    return await this.cabineModel
      .find(data.$filter || {})
      .limit(data.$top || 10)
      .skip(data.$skip || 0);
  }

  @MessagePattern('cabins:create')
  async create(data: ICabine): Promise<ICabine> {
    this.logger.log(`create call. ${JSON.stringify(data)}`);
    const c = new this.cabineModel(data);
    return await c.save({ new: true });
  }
}
