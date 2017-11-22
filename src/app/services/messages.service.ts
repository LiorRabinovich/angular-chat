import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable()
export class MessagesService {
  messages: Message[] = [];

  constructor() { }

  getMessages() {
    // let messagesLocalStorege = localStorage.getItem('messages');
    // if (messagesLocalStorege) this.messages = JSON.parse(messagesLocalStorege);
    return this.messages;
  }

  saveMessage(message) {
    this.messages.push(message);
    // localStorage.setItem('messages', JSON.stringify(this.messages));
  }

}
