import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ conversation, setConversation }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add this line to create a loading state
  const apiUrl = "https://fintech-cards.azurewebsites.net";


  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [conversation]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // Add the new message to the conversation
    setConversation([...conversation, { role: 'user', content: message, timestamp: new Date() }]);

    setIsLoading(true); // Set loading state to true before the fetch request


    // Send the message to the server
    const response = await fetch(`${apiUrl}/ai_call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:localStorage.getItem("Id") , questionText: message }),
    });

    const data = await response.json();

    setIsLoading(false); // Set loading state to false after receiving the response

    // Add the response to the conversation
    setConversation(prevConversation => [...prevConversation, { role: 'ai', content: data.response, timestamp: new Date() }]);
    // setConversation([...conversation, { role: 'ai', content: data.response }]);
  };

  return (
    <div className='chat-interface'>
      <div className='chat-messages'>
      <ul >
        {conversation.map((message, i) => {
          const lines = message.content.split('\n');
         return (
          <li key={i} className={`${message.role} message ${conversation.length - i <= 10 ? 'show' : ''}`}>
            <strong>{message.role === 'user' ? 'You' : 'Advisor'}:</strong>
            {lines.map((line, j) => (
        <React.Fragment key={j}>
          <span dangerouslySetInnerHTML={{ __html: line }} />
          <br />
        </React.Fragment>
      ))}            <span className='timestamp'>{new Date(message.timestamp).toLocaleTimeString()}</span> {/* Display the timestamp */}

          </li>
        );
         })}
        {isLoading && <li className='loading-message message'>Loading...</li>} {/* Show loading text when isLoading is true */}

      </ul>
      </div>
      <div className='chat-form' >
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <input type="submit" value=">" />
      </form>
      </div>
    </div>
  );
};

export default ChatInterface;