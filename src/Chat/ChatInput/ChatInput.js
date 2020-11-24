import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onChange = (event) => {
    const text = event.target.value;
    this.setState({
      text,
    });
  };

  sendMessage = () => {
    if (this.state.text === '') return;
    const message = {
      text: this.state.text,
      role: 'customer',
    };
    this.props.getMessage(message);
    this.setState({
      text: '',
    });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          value={this.state.text}
          onChange={this.onChange}
          onKeyDown={this.handleKeyDown}
        />
        <button type="button" onClick={this.sendMessage}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
