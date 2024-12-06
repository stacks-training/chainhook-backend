import { Injectable } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';
import { StacksApiSocketClient } from '@stacks/blockchain-api-client';

const socketUrl = "https://api.testnet.hiro.so";

@Injectable()
export class AppService {
  constructor(private readonly socketClient: SocketService) {
    this.setupListeners();
  }

  private setupListeners() {
    const sc = new StacksApiSocketClient({ url: socketUrl });

    sc.subscribeAddressTransactions('ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T', (address, tx) => {
      console.log('address:', address);
      console.log('tx:', tx);
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
