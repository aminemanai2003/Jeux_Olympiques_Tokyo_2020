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
      alert('Veuillez entrer une adresse email');
      return;
    }

    setIsSending(true);
    setSuccess(false);

    try {
      // Capture screenshot
      const html2canvas = (await import('html2canvas')).default;
      const element = document.querySelector('.bg-white.rounded-2xl, .bg-white.dark\\:bg-gray-800') || document.querySelector('main');
      if (!element) throw new Error('Élément non trouvé');
      
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
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
          message: message || 'Rapport Tableau de Bord Jeux Olympiques Tokyo 2020',
          attachment: imageData,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Échec envoi email');

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setEmail('');
        setMessage('');
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      console.error('Échec envoi email:', error);
      alert(`Échec de l'envoi: ${error.message || 'Veuillez réessayer.'}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Envoyer le Rapport</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Partager un aperçu du tableau de bord</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Destinataire *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="destinataire@example.com"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Message (optionnel)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ajouter un message personnalisé..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={isSending}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Envoi en cours...
              </>
            ) : success ? (
              <>
                <Check className="w-5 h-5" />
                Envoyé !
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Envoyer l'Email
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          L'email sera envoyé depuis : aminemanai456123@gmail.com
        </p>
      </div>
    </div>
  );
}
