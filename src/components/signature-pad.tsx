"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import NextImage from "next/image";

interface SignaturePadProps {
  value?: string;
  onChange: (signature: string) => void;
  label: string;
}

// Fullscreen modal for mobile signature
function FullscreenSignatureModal({
  isOpen,
  onClose,
  onSave,
  label,
  initialValue,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
  label: string;
  initialValue?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to fill the container
      const container = canvas.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(2, 2);

      // Style
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Load existing signature if any
      if (initialValue) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
        };
        img.src = initialValue;
        setHasDrawn(true);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(setupCanvas, 100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen, initialValue]);

  const getCoordinates = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();

      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      setIsDrawing(true);
      setHasDrawn(true);
      const { x, y } = getCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [getCoordinates]
  );

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      const { x, y } = getCoordinates(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [isDrawing, getCoordinates]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas && hasDrawn) {
      onSave(canvas.toDataURL("image/png"));
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 bg-gray-100 flex flex-col"
          style={{ touchAction: "none" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            <button
              onClick={onClose}
              className="text-[17px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              Avbryt
            </button>
            <span className="text-[17px] font-semibold text-gray-900">
              {label}
            </span>
            <button
              onClick={handleSave}
              className="text-[17px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Ferdig
            </button>
          </div>

          {/* Canvas container */}
          <div className="flex-1 p-4 flex flex-col items-center justify-center">
            <div className="w-full aspect-[4/3] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              {!hasDrawn && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-gray-400 text-lg">Signer her</span>
                </div>
              )}
            </div>

            <button
              onClick={handleClear}
              className="mt-8 text-[15px] text-red-500 font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              Slett signatur
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SignaturePad({ value, onChange, label }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Style
    ctx.strokeStyle = "#1e1b4b";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Load existing signature
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
      };
      img.src = value;
    }
  }, []);

  // Reload signature when value changes from fullscreen modal
  const currentValue = value;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentValue) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
    img.src = currentValue;
  }, [currentValue]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (canvas) {
      onChange(canvas.toDataURL("image/png"));
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };

  const handleFullscreenSave = (signature: string) => {
    onChange(signature);
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 h-32 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[13px] font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </label>
          <div className="flex items-center gap-3">
            {value && (
              <button
                type="button"
                onClick={clear}
                className="text-[13px] text-red-500 font-medium hover:text-red-600 transition-colors"
              >
                Slett
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFullscreen(true)}
              className="sm:hidden text-[13px] text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Signer
            </button>
          </div>
        </div>

        <div
          className="relative flex-1 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 overflow-hidden cursor-pointer sm:cursor-default"
          onClick={() => {
            if (window.innerWidth < 640) {
              setShowFullscreen(true);
            }
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair touch-none hidden sm:block"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {/* Mobile: Show preview or placeholder */}
          <div className="sm:hidden w-full h-full flex items-center justify-center">
            {value ? (
              <div className="relative w-full h-full p-2">
                <NextImage
                  src={value}
                  alt={`${label} signatur`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <span className="text-[13px] text-gray-400">
                Trykk for å signere
              </span>
            )}
          </div>
          {/* Desktop placeholder */}
          {!value && (
            <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none">
              <span className="text-[13px] text-gray-400">Tegn her</span>
            </div>
          )}
        </div>
      </div>

      <FullscreenSignatureModal
        isOpen={showFullscreen}
        onClose={() => setShowFullscreen(false)}
        onSave={handleFullscreenSave}
        label={label}
        initialValue={value}
      />
    </>
  );
}
