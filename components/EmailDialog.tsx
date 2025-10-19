'use client';

import { useState } from 'react';
import { X, Mail, Loader2, Check } from 'lucide-react';

interface EmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailDialog({ isOpen, onClose }: EmailDialogProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!email) {
      alert('Please enter an email address');
      return;
    }

    setIsSending(true);
    setSuccess(false);

    try {
      // Capture screenshot
      const html2canvas = (await import('html2canvas')).default;
      const element = document.querySelector('.bg-white.rounded-2xl');
      if (!element) throw new Error('Element not found');
      
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const imageData = canvas.toDataURL('image/png');

      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          message: message || 'Tokyo 2020 Olympics Dashboard Report',
          attachment: imageData,
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setEmail('');
        setMessage('');
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Send Report</h2>
            <p className="text-sm text-gray-500">Share dashboard snapshot via email</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={isSending}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : success ? (
              <>
                <Check className="w-5 h-5" />
                Sent!
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Send Email
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Email will be sent from: aminemanai456123@gmail.com
        </p>
      </div>
    </div>
  );
}
