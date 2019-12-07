import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICabine, ICabinQueryOpts } from './interfaces/cabine.interface';

@Controller()
export class CabinsCtrl {
  private readonly logger: Logger = new Logger('CabinCtrl');
  constructor(
    @InjectModel('Cabine') private readonly cabineModel: Model<ICabine>,
  ) {}

  // @MessagePattern('cabins:list')
  @GrpcMethod('CabinService', 'List')
  async list(data: ICabinQueryOpts) {
    this.logger.log(`list call. ${JSON.stringify(data)}`);
    const d = await this.cabineModel.find({})
      .limit(data.top || 10)
      .skip(data.skip || 0);;
    return {
      value: d.map((one) => one.toJSON({ virtuals: true })),
    };
  }

  // @MessagePattern('cabins:create')
  @GrpcMethod('CabinService', 'Create')
  async create(data: ICabine): Promise<ICabine> {
    this.logger.log(`create call. ${JSON.stringify(data)}`);
    const c = new this.cabineModel(data);
    return await c.save({ new: true });
  }

  @GrpcMethod('CabinService', 'GetById')
  async getById(data: { id: string }): Promise<ICabine> {
    return await this.cabineModel.findById(data.id);
  }
}
