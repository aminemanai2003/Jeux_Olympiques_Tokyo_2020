"use client";

import { useState } from "react";
import { X, Mail, Loader2, Check } from "lucide-react";
import jsPDF from "jspdf";
import { type PageKey } from "@/lib/pageImages";

interface EmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  availablePages: { key: PageKey; label: string; data: string }[];
}

export default function EmailDialog({ isOpen, onClose, availablePages }: EmailDialogProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selected, setSelected] = useState<PageKey[]>(["page1"]);

  if (!isOpen) return null;

  const toggleSelect = (key: PageKey) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const fetchWithFallback = async (path: string) => {
    const tryPrimary = await fetch(path);
    if (tryPrimary.ok) return tryPrimary;
    const fallbackPath = path.replace("/source/bi/", "/bi/");
    const tryFallback = await fetch(fallbackPath);
    return tryFallback;
  };

  const buildPdfFromImages = async (pages: PageKey[]) => {
    if (!pages.length) throw new Error("Aucune page sélectionnée");
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    for (let i = 0; i < pages.length; i++) {
      const meta = availablePages.find((p) => p.key === pages[i]);
      if (!meta || !meta.data) continue;
      
      // Les images sont directement intégrées en base64
      const srcDataUrl = meta.data;

      const normalizeImage = async (src: string) => {
        // Charger l'image et la normaliser (canvas -> JPEG)
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const imgData = await new Promise<string>((resolve, reject) => {
              const img = new Image();
              img.onload = () => {
                try {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.naturalWidth || img.width;
                  canvas.height = img.naturalHeight || img.height;
                  const ctx = canvas.getContext('2d');
                  if (!ctx) return reject(new Error('Cannot get canvas context'));
                  ctx.drawImage(img, 0, 0);
                  const jpg = canvas.toDataURL('image/jpeg', 0.92);
                  resolve(jpg);
                } catch (e) {
                  reject(e);
                }
              };
              img.onerror = (e) => {
                console.error('[EmailDialog.normalizeImage] img.onerror', e, 'src preview:', src ? src.slice(0, 200) : src);
                reject(new Error("Impossible de charger l'image pour normalisation"));
              };
              img.src = src;
            });
            return imgData;
          } catch (e) {
            if (attempt === 0) await new Promise((r) => setTimeout(r, 200));
            else throw e;
          }
        }
        throw new Error('Échec normalisation image');
      };

      const norm = await normalizeImage(srcDataUrl!);
      if (i > 0) pdf.addPage();
      const imgProps = pdf.getImageProperties(norm);
      const pdfWidth = 297;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(norm, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }

    return pdf;
  };

  const handleSend = async () => {
    if (!email) {
      alert("Veuillez entrer une adresse email");
      return;
    }

    setIsSending(true);
    setSuccess(false);

    try {
      console.debug('[EmailDialog.handleSend] selected pages:', selected);
      for (const key of selected) {
        const meta = availablePages.find((p) => p.key === key);
        console.debug('[EmailDialog.handleSend] source for', key, meta);
      }

      const pdf = await buildPdfFromImages(selected);
      const base64 = pdf.output("datauristring");

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          message: message || "Rapport Tableau de Bord Jeux Olympiques Tokyo 2020",
          attachment: base64,
          filename: `Rapport_JO_Tokyo2020_${new Date().toISOString().split("T")[0]}.pdf`,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Échec envoi email");

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setEmail("");
        setMessage("");
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      console.error("Échec envoi email:", error);
      alert(`Échec de l'envoi: ${error.message || "Veuillez réessayer."}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Envoyer le Rapport</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sélectionnez les pages à inclure et envoyez en PDF</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {availablePages.map((p) => (
            <label key={p.key} className={`cursor-pointer p-3 border rounded-lg flex flex-col items-center justify-center ${selected.includes(p.key) ? 'ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-600'}`}>
              <img src={p.data} alt={p.label} className="w-full h-24 object-cover rounded-md mb-2" />
              <input type="checkbox" checked={selected.includes(p.key)} onChange={() => toggleSelect(p.key)} />
              <span className="text-sm mt-1 text-gray-700 dark:text-gray-300">{p.label}</span>
            </label>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Destinataire *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="destinataire@example.com" className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message (optionnel)</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ajouter un message personnalisé..." rows={3} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors resize-none" />
          </div>

          <button onClick={handleSend} disabled={isSending} className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
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

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">L'email sera envoyé depuis : aminemanai456123@gmail.com</p>
      </div>
    </div>
  );
}
