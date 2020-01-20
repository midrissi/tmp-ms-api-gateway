import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICabine, ICabinQueryOpts, IPaginable } from './interfaces/cabine.interface';

@Controller()
export class CabinsCtrl {
  private readonly logger: Logger = new Logger('CabinCtrl');
  constructor(
    @InjectModel('Cabine') private readonly cabineModel: Model<ICabine>,
  ) { }

  @MessagePattern('cabins:list')
  async list(data: ICabinQueryOpts): Promise<IPaginable<ICabine>> {
    console.log('New request received at port %s', process.env.PORT);
    this.logger.log(`list call. ${JSON.stringify(data)}`);

    const skip = data.$skip || 0;
    const top = data.$top || 10;
    const filter = data.$filter || {};

    const count = await this.cabineModel
      .find(filter)
      .count();

    const value = top > 0
    ? await this.cabineModel
      .find(filter)
      .limit(top)
      .skip(skip)
    : [];

    return {
      top,
      skip,
      value,
      count,
    };
  }

  @MessagePattern('cabins:create')
  async create(data: ICabine): Promise<ICabine> {
    this.logger.log(`create call. ${JSON.stringify(data)}`);
    const c = new this.cabineModel(data);
    return await c.save({ new: true });
  }
}
