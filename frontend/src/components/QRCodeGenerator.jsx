import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';

const QRCodeGenerator = ({ value, size = 128 }) => {
  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-code-${value}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qr-code-container">
      <QRCodeCanvas
        id="qr-code"
        value={value}
        size={size}
        level="H"
        includeMargin={true}
      />
      <button onClick={downloadQR} className="download-qr-button">
        Скачать QR-код
      </button>
    </div>
  );
};

export default QRCodeGenerator;