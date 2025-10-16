// Example usage of QRCodeSection component
// This file shows how to customize the QR code section

import React from "react";
import QRCodeSection from "./QRCodeSection";

// Example 1: Basic usage with placeholder
export const BasicQRExample = () => {
  return <QRCodeSection position="top-right" size="large" showLabel={true} />;
};

// Example 2: With custom QR code (replace with actual QR code)
export const CustomQRExample = () => {
  const customQR = (
    <img
      src="/frame.png"
      alt="Join Game QR Code"
      className="w-full h-full object-contain rounded"
    />
  );

  return (
    <QRCodeSection
      position="bottom-right"
      size="medium"
      showLabel={true}
      customQR={customQR}
    />
  );
};

// Example 3: Minimal QR without label
export const MinimalQRExample = () => {
  return <QRCodeSection position="top-left" size="small" showLabel={false} />;
};

// Example 4: With SVG QR code
export const SVGQRExample = () => {
  const svgQR = (
    <svg width="100%" height="100%" viewBox="0 0 100 100" className="rounded">
      {/* Replace this with your actual QR code SVG */}
      <img src='../../public/frame.png'/>
      <rect width="100" height="100" fill="black" />
      <text x="50" y="50" textAnchor="middle" fill="white" fontSize="12">
        QR
      </text>
    </svg>
  );

  return (
    <QRCodeSection
      position="bottom-left"
      size="large"
      showLabel={true}
      customQR={svgQR}
    />
  );
};

// To replace the placeholder with actual QR code:
// 1. Generate your QR code image/SVG
// 2. Replace the customQR prop with your QR code component
// 3. Update the src path or SVG content accordingly

export default QRCodeSection;
