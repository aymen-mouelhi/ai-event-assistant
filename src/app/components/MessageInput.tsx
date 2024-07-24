import React from "react";

interface MessageInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  handleSendMessage,
}) => {
  return (
    <div className="absolute bottom-0 w-full flex items-center p-4 bg-gray-800 mt-4">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-grow p-2 bg-gray-900 text-white border border-gray-600 rounded-l"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSendMessage();
        }}
      />
      <button
        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r"
        onClick={handleSendMessage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
