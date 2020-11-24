import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  replyMessage = (input, dialog) => {
    const defaultMessage = answersData.find((answer) =>
      answer.tags.some((tag) => input.text.includes(tag))
    );
    if (defaultMessage) {
      const messages = dialog.concat(defaultMessage);
      setTimeout(() => {
        this.setState({
          messages,
        });
      }, 1000);
    }
  };

  getMessage = (input) => {
    const messages = this.state.messages.concat(input);
    setTimeout(() => {
      this.setState(
        {
          messages,
        },
        () => this.replyMessage(input, messages)
      );
    }, 0);
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput getMessage={this.getMessage} />
      </main>
    );
  }
}

export default Chat;
