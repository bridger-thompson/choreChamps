import React, { FormEvent, useContext, useState } from "react";
import { WebsocketContext } from "./WebsocketChatContext";

export const WebsocketChat = () => {
  const context = useContext(WebsocketContext);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      context.sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="container text-center">
      <h1>Chat</h1>
      <div className="border rounded vh-50 frosted-glass"
        style={{ height: "75ex" }}>
        {context.messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <div className="row my-1">
          <div className="col-4 offset-4">
            <input
              type="text"
              autoFocus
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-4 text-start">
            <button type="submit"
              className="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
};
