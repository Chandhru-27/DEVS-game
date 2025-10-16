"use client";

import React from "react";

interface QRCodeSectionProps {
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  size?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
  showLabel?: boolean;
  customQR?: React.ReactNode;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({
  position = "top-right",
  size = "medium",
  showLabel = true,
  customQR,
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "fixed top-4 right-4";
      case "bottom-right":
        return "fixed bottom-4 right-4";
      case "top-left":
        return "fixed top-4 left-4";
      case "bottom-left":
        return "fixed bottom-4 left-4";
      default:
        return "fixed top-4 right-4";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-12 h-12";
      case "medium":
        return "w-16 h-16";
      case "large":
        return "w-20 h-20";
      case "xlarge":
        return "w-24 h-24";
      case "xxlarge":
        return "w-46 h-46";
      default:
        return "w-16 h-16";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-xs";
      case "medium":
        return "text-xs";
      case "large":
        return "text-sm";
      case "xlarge":
        return "text-sm";
      case "xxlarge":
        return "text-base";
      default:
        return "text-xs";
    }
  };

  return (
    <div
      className={`${getPositionClasses()} z-20 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20`}
    >
      <div className="text-center">
        <div
          className={`${getSizeClasses()} bg-white rounded-lg flex items-center justify-center mb-2 mx-auto`}
        >
          {customQR ? (
            customQR
          ) : (
            <span className={`text-black ${getTextSize()} font-mono`}>
              <img src="/frame.png" alt="QR Frame" />
            </span>
          )}
        </div>
        {showLabel && (
          <p className={`text-white ${getTextSize()} font-medium`}>Join Game</p>
        )}
      </div>
    </div>
  );
};

export default QRCodeSection;
