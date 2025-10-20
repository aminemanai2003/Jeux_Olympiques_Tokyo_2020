"use client";

import { useState } from "react";
import { FileDown, Mail } from "lucide-react";
import jsPDF from "jspdf";
import EmailDialog from "./EmailDialog";
import { PAGE_IMAGES, type PageKey } from "@/lib/pageImages";

const AVAILABLE_PAGES: { key: PageKey; label: string; data: string }[] = [
  { key: "page1", label: "Page 1", data: PAGE_IMAGES.page1 },
  { key: "page2", label: "Page 2", data: PAGE_IMAGES.page2 },
  { key: "page3", label: "Page 3", data: PAGE_IMAGES.page3 },
];

export default function ExportButtons() {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selected, setSelected] = useState<PageKey[]>(["page1"]);

  const toggleSelect = (key: PageKey) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  // Try primary path then fallback to /bi
  const fetchWithFallback = async (path: string) => {
    const tryPrimary = await fetch(path);
    if (tryPrimary.ok) return tryPrimary;
    // fallback
    const fallbackPath = path.replace("/source/bi/", "/bi/");
    const tryFallback = await fetch(fallbackPath);
    return tryFallback;
  };

  const normalizeImage = async (src: string) => {
    // load image and draw to canvas then return JPEG dataURL to ensure compatibility with jsPDF
    return new Promise<string>((resolve, reject) => {
      try {
        console.debug('[normalizeImage] src length:', src?.length, 'startsWith data:', src?.startsWith?.('data:'));
      } catch (e) {}
      const img = new Image();
      // only set crossOrigin for remote URLs (not data URLs)
      try {
        if (src && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('blob:'))) {
          // allow CORS for remote resources
          (img as any).crossOrigin = 'anonymous';
        }
      } catch (e) {}

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
        console.error('[normalizeImage] img.onerror', e, 'src preview:', src ? src.slice(0, 200) : src);
        reject(new Error("Impossible de charger l'image pour normalisation"));
      };
      img.src = src;
    });
  };

  const buildPdfFromImages = async (pages: PageKey[]) => {
    if (!pages.length) throw new Error("Aucune page sélectionnée");
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    for (let i = 0; i < pages.length; i++) {
      const meta = AVAILABLE_PAGES.find((p) => p.key === pages[i]);
      if (!meta || !meta.data) continue;
      
      // Les images sont directement intégrées en base64, pas besoin de fetch
      const srcDataUrl = meta.data;
      
      // Normaliser l'image (canvas -> JPEG) pour éviter les problèmes de PNG corrompu
      const norm = await normalizeImage(srcDataUrl);

      if (i > 0) pdf.addPage();
      const imgProps = pdf.getImageProperties(norm);
      const pdfWidth = 297; // A4 landscape mm
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(norm, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }

    return pdf;
  };

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      // debug: list sources
      console.debug('[handleDownload] selected pages:', selected);
      for (const key of selected) {
        const meta = AVAILABLE_PAGES.find((p) => p.key === key);
        console.debug('[handleDownload] source for', key, meta);
      }

      const pdf = await buildPdfFromImages(selected);
      const filename = `Rapport_JO_Tokyo2020_${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(filename);
      setDownloadModalOpen(false);
    } catch (err: any) {
      console.error("Erreur création PDF:", err);
      alert(err.message || "Erreur lors de la création du PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center md:justify-end">
        <button
          onClick={() => setDownloadModalOpen(true)}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
        >
          <FileDown className="w-5 h-5" />
          Télécharger PDF
        </button>

        <button
          onClick={() => setEmailModalOpen(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
        >
          <Mail className="w-5 h-5" />
          Envoyer par Email
        </button>
      </div>

      {downloadModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 relative">
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Sélectionnez les rapports à inclure</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Choisissez une ou plusieurs pages (images) à incorporer dans le PDF.</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {AVAILABLE_PAGES.map((p) => (
                <label key={p.key} className={`cursor-pointer p-3 border rounded-lg flex flex-col items-center justify-center ${selected.includes(p.key) ? 'ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-600'}`}>
                  <img src={p.data} alt={p.label} className="w-full h-24 object-cover rounded-md mb-2" />
                  <input type="checkbox" checked={selected.includes(p.key)} onChange={() => toggleSelect(p.key)} />
                  <span className="text-sm mt-1 text-gray-700 dark:text-gray-300">{p.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2 justify-end">
              <button onClick={() => setDownloadModalOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600">Annuler</button>
              <button onClick={handleDownload} disabled={isExporting} className="px-4 py-2 bg-red-600 text-white rounded-lg">{isExporting ? 'Génération...' : 'Télécharger PDF'}</button>
            </div>
          </div>
        </div>
      )}

      <EmailDialog isOpen={emailModalOpen} onClose={() => setEmailModalOpen(false)} availablePages={AVAILABLE_PAGES} />
    </>
  );
}
