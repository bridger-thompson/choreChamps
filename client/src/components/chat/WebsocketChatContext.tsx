import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface WebsocketChatContextType {
  messages: string[];
  sendMessage: (msg: string) => void;
}

export const WebsocketContext = createContext<WebsocketChatContextType>({
  messages: [],
  sendMessage: () => { },
});

export const WebsocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
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
      addMessage("Connected to the relay server.");
    };

    wsRef.current.onmessage = (event) => {
      addMessage(`Received: ${event.data}`);
    };

    wsRef.current.onclose = () => {
      addMessage("Disconnected from the server.");
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

  const addMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  const sendMessage = (msg: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
      addMessage(`You: ${msg}`);
    }
  };

  return (
    <WebsocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};
