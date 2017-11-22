import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

// interfaces
import { Message } from './interfaces/message';

// services
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessagesService]
})
export class AppComponent implements OnInit {
  socket;
  numberOfOnlineUsers: number;
  messages: Message[] = [];
  myMessage: Message = {
    content: null,
    username: null,
    date: null,
    avatar: null
  }

  constructor(private messagesService: MessagesService) {
    this.socket = io();
  }

  // init function
  public ngOnInit() {
    // get all messages from localstorege
    // this.messages = this.messagesService.getMessages();

    // listen on number of online users
    this.socket.on('numberOfOnlineUsers', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
      // update my message username and avatar
      if (!this.myMessage['username']) this.myMessage['username'] = 'guest' + (this.numberOfOnlineUsers ? this.numberOfOnlineUsers : '');
      if (!this.myMessage['avatar']) this.myMessage['avatar'] = 'assets/images/avatars/' + (Math.floor(Math.random() * (10 - 1)) + 1) + '.jpg';
    });

    // listen on update messages
    this.socket.on('updateMessages', (message) => {
      this.messages.push(message);
    });
  }

  // send message function
  public sendMessage(e) {
    e.preventDefault();

    // update my message date
    let d = new Date;
    this.myMessage['date'] = [d.getDate(),
    d.getMonth() + 1,
    d.getFullYear()].join('/') + ' ' +
      [d.getHours(),
      d.getMinutes(),
      d.getSeconds()].join(':');

    // emit to create message
    this.socket.emit('createMessage', this.myMessage);

    // save message in localstorege
    // this.messagesService.saveMessage(this.myMessage);

    // reset my message content
    this.myMessage['content'] = null;
  }
}