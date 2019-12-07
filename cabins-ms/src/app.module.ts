import { Module } from '@nestjs/common';
import { CabinsCtrl } from './cabins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from '@nestjs/microservices';
import { CabineSchema } from './schemas/cabin.schema';

@Module({
  imports: [
    ClientsModule,
    MongooseModule.forRoot('mongodb://localhost/cabine-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{
      name: 'Cabine',
      schema: CabineSchema,
      collection: 'cabines',
    }]),
  ],
  controllers: [CabinsCtrl],
})
export class AppModule {}
