import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketService implements OnModuleInit, OnModuleDestroy {
  private socket: Socket;
  private readonly serverUrl = 'https://api.testnet.hiro.so'; // Target socket server

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket() {
    this.socket = io(this.serverUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('🚀 Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('💥 Disconnected from socket server');
    });
  }

  onModuleInit() {
    // Additional initialization if needed
  }

  onModuleDestroy() {
    this.socket.disconnect();
  }

  // Send a message to the server
  sendMessage(event: string, data: any) {
    if (this.socket.connected) {
      this.socket.emit(event, data);
    }
  }

  // Listen for a specific event
  onEvent(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }
}