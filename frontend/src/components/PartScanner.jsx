import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/browser';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Button, Dropdown, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import partService from '../services/partService';
import './PartScanner.css';

const PartScanner = ({ operation = "search", onPartFound, quantityToAdd = 1 }) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const [manualCode, setManualCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  // Stop scanner
  const stopScanner = useCallback(async () => {
    if (readerRef.current) {
      try {
        await readerRef.current.stopContinuousDecode();
        await readerRef.current.reset();
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  }, []);

  // Process scan result
  const processScanResult = useCallback(async (result) => {
    try {
      setLoading(true);
      setError("");
      
      const decodedText = result.getText();
      console.log('Decoded text:', decodedText, 'Format:', result.getBarcodeFormat());
      
      let part;
      
      // First try as barcode
      part = await partService.getPartByBarcode(decodedText);
      
      if (!part) {
        // Then try as QR code
        part = await partService.getPartByQRCode(decodedText);
      }
      
      if (!part) {
        // Finally try as text ID
        part = await partService.findByTextId(decodedText);
      }

      if (part) {
        onPartFound({ part, operation, quantity: quantityToAdd });
        
        // Play success sound
        const audio = new Audio('/assets/sounds/beep-success.mp3');
        audio.play().catch(err => console.log('Audio play error:', err));
        
        if (operation === "search") {
          await stopScanner();
        }
      } else {
        setError(t("parts.part_not_found") || "Запчасть не найдена");
        const audio = new Audio('/assets/sounds/beep-error.mp3');
        audio.play().catch(err => console.log('Audio play error:', err));
      }
    } catch (err) {
      setError(t("scanner.error_searching_part") || "Ошибка при поиске запчасти");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [onPartFound, operation, quantityToAdd, t, stopScanner]);

  // Initialize scanner
  const initializeScanner = useCallback(async () => {
    try {
      console.log('Initializing scanner...');
      
      // Check for camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      stream.getTracks().forEach(track => track.stop()); // Release the test stream
      
      // Get available cameras
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log('Available cameras:', videoDevices);
      
      if (videoDevices.length === 0) {
        throw new Error('Камеры не найдены');
      }
      
      // Find back camera
      const backCamera = videoDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('environment') ||
        device.label.toLowerCase().includes('задн')
      );
      
      setCameras(videoDevices);
      setSelectedCamera(backCamera || videoDevices[0]);
      
      // Initialize ZXing reader
      const formats = [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.ITF,
        BarcodeFormat.CODABAR
      ];
      
      const reader = new BrowserMultiFormatReader();
      reader.setFormats(formats);
      readerRef.current = reader;
      
      setError(null);
    } catch (err) {
      console.error('Scanner initialization error:', err);
      let errorMessage = 'Ошибка инициализации камеры. ';
      
      if (err.name === 'NotAllowedError') {
        errorMessage += 'Необходимо разрешить доступ к камере в настройках браузера.';
      } else if (err.name === 'NotFoundError') {
        errorMessage += 'Камера не найдена.';
      } else if (err.name === 'NotReadableError') {
        errorMessage += 'Камера занята другим приложением.';
      } else {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
    }
  }, []);

  // Start scanner with enhanced error handling
  const startScanner = useCallback(async () => {
    if (!readerRef.current || !selectedCamera || !videoRef.current) {
      console.log('Scanner not ready:', {
        reader: !!readerRef.current,
        camera: selectedCamera?.label,
        video: !!videoRef.current
      });
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Starting scanner with camera:', selectedCamera.label);
      
      await readerRef.current.decodeFromVideoDevice(
        selectedCamera.deviceId,
        videoRef.current,
        (result, error) => {
          if (result) {
            processScanResult(result);
          }
          if (error && !error.message.includes('No MultiFormat Readers were able to detect the code.')) {
            console.error('Scanning error:', error);
          }
        }
      );
      
      setIsScanning(true);
      console.log('Scanner started successfully');
    } catch (err) {
      console.error('Error starting scanner:', err);
      setError('Ошибка запуска камеры: ' + err.message);
      
      // Try to reinitialize
      setTimeout(() => {
        initializeScanner();
      }, 1000);
    } finally {
      setLoading(false);
    }
  }, [selectedCamera, processScanResult, initializeScanner]);

  // Handle camera selection
  const handleCameraChange = useCallback(async (cameraId) => {
    const newCamera = cameras.find(cam => cam.deviceId === cameraId);
    if (newCamera && newCamera.deviceId !== selectedCamera?.deviceId) {
      const wasScanning = isScanning;
      if (wasScanning) {
        await stopScanner();
      }
      setSelectedCamera(newCamera);
      if (wasScanning) {
        setTimeout(() => {
          startScanner();
        }, 300);
      }
    }
  }, [cameras, selectedCamera, isScanning, stopScanner, startScanner]);

  // Handle manual code entry
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    try {
      setLoading(true);
      setError("");
      
      let part = await partService.getPartByBarcode(manualCode.trim());
      
      if (!part) {
        part = await partService.getPartByQRCode(manualCode.trim());
      }
      
      if (part) {
        onPartFound({ part, operation, quantity: quantityToAdd });
        setManualCode("");
      } else {
        setError(t("parts.part_not_found") || "Запчасть не найдена");
      }
    } catch (err) {
      setError(t("scanner.error_searching_part") || "Ошибка при поиске запчасти");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize scanner on mount
  useEffect(() => {
    console.log('Component mounted, initializing scanner...');
    initializeScanner();
    
    return () => {
      console.log('Component unmounting, stopping scanner...');
      stopScanner();
    };
  }, [initializeScanner, stopScanner]);
  
  // Toggle scanning
  const toggleScanning = async () => {
    if (isScanning) {
      await stopScanner();
    } else {
      await startScanner();
    }
  };

  return (
    <div className="part-scanner">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <div className="scanner-controls mb-3">
        {cameras.length > 1 && (
          <Dropdown className="mb-2">
            <Dropdown.Toggle variant="secondary" id="camera-dropdown" disabled={loading}>
              {selectedCamera ? selectedCamera.label.substring(0, 30) : t("scanner.select_camera") || "Выберите камеру"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {cameras.map((camera) => (
                <Dropdown.Item 
                  key={camera.deviceId} 
                  onClick={() => handleCameraChange(camera.deviceId)}
                >
                  {camera.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
        
        <Button
          onClick={toggleScanning}
          variant={isScanning ? "danger" : "primary"}
          className="mb-2 w-100"
          disabled={loading || !selectedCamera}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : isScanning ? (
            t("scanner.stop_scanning") || "Остановить сканирование"
          ) : (
            t("scanner.start_scanning") || "Начать сканирование"
          )}
        </Button>
      </div>
      
      <div className="scanner-container mb-3">
        <video 
          ref={videoRef}
          className="scanner-video"
          style={{ 
            width: '100%',
            height: '300px',
            objectFit: 'cover'
          }}
        />
      </div>

      <hr />

      <h5>{t("scanner.manual_entry") || "Ручной ввод"}</h5>
      <Form onSubmit={handleManualSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder={t("scanner.enter_code_or_id") || "Введите код или идентификатор"}
            disabled={loading}
          />
        </Form.Group>
        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading || !manualCode.trim()}
          className="w-100"
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            t("scanner.find") || "Найти"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default PartScanner;