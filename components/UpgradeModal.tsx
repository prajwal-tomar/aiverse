interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import axios from "axios";
import {
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Check,
  Zap,
} from "lucide-react";
import { useState } from "react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    iconColor: "text-blue-800",
    bgColor: "bg-blue-300",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    iconColor: "text-green-800",
    bgColor: "bg-green-300",
    href: "/image",
  },
  {
    label: "Music Generation",
    icon: Music,
    iconColor: "text-orange-800",
    bgColor: "bg-orange-300",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    iconColor: "text-indigo-800",
    bgColor: "bg-indigo-300",
    href: "/code",
  },
];

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-70 backdrop-blur-2xl"
        onClick={onClose}
      />

      <div className="modal-container bg-white md:w-[28rem] w-[90%] mx-auto py-8 px-5 rounded-lg shadow-lg z-50">
        <div className="modal-header flex justify-between items-start">
          <h2 className="text-xl font-bold text-center w-full mb-5">
            Upgrade to aiverse Pro
          </h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          {tools.map((tool) => (
            <div className="mb-5">
              <div
                className={`border border-black/10 p-3 hover:shadow-xl rounded-lg`}
              >
                <div className="flex justify-between items-center px-2">
                  <div className="flex items-center space-x-4">
                    <div className={`rounded-lg p-1 ${tool.bgColor}`}>
                      <tool.icon className={`${tool.iconColor}`} />
                    </div>

                    <div className="hover:cursor-pointer font-semibold">
                      {tool.label}
                    </div>
                  </div>
                  <Check />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <div className="flex items-center justify-center bg-purple-700 ml-auto rounded-lg hover:bg-purple-600 hover:cursor-pointer">
            <h1
              className="text-white text-md font-bold py-2"
              onClick={onSubscribe}
            >
              Upgrade
            </h1>
            <Zap className="w-6 h-6 ml-1 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
