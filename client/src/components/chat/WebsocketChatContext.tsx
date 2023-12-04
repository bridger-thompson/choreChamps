import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface WebsocketChatContextType {
  messages: MessageType[];
  sendMessage: (msg: string) => void;
}

interface MessageType {
  from: "sent" | "received";
  content: string;
}

export const WebsocketContext = createContext<WebsocketChatContextType>({
  messages: [],
  sendMessage: () => { },
});

export const WebsocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    console.log(window.location.hostname)
    if (window.location.hostname === 'localhost') {
      const serverUrl = "ws://localhost:8000/api/ws/chat";
      wsRef.current = new WebSocket(serverUrl);
    }
    else {
      const serverUrl = "wss://chorechamps.duckdns.org:5003/api/ws/chat";
      wsRef.current = new WebSocket(serverUrl);
    }

    wsRef.current.onopen = () => {
      console.log("Connected to the relay server.");
    };

    wsRef.current.onmessage = (event) => {
      addMessage(`Them: ${event.data}`, "received");
    };

    wsRef.current.onclose = () => {
      console.log("Disconnected from the server.");
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const addMessage = (msg: string, type: "received" | "sent") => {
    setMessages((prev) => [...prev, { from: type, content: msg }]);
  };

  const sendMessage = (msg: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
      addMessage(`You: ${msg}`, "sent");
    }
  };

  return (
    <WebsocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};
