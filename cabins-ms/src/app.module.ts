import { Module } from '@nestjs/common';
import { CabinsCtrl } from './cabins.controller';
import { AppCtrl } from './app.controller';
import { ClientsModule, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule],
  controllers: [CabinsCtrl, AppCtrl],
  providers: [{
    provide: 'MATH_SERVICE',
    useFactory: () => {
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          port: 5000,
        }
      });
    }
  }]
})
export class AppModule {}
