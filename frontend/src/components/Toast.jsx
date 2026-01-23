import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50`}>
      {message}
      <button onClick={onClose} className="ml-4 font-bold">×</button>
    </div>
  );
}