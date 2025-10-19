'use client';

import { useState } from 'react';
import { Mail, FileDown, Loader2, Check } from 'lucide-react';
import EmailDialog from './EmailDialog';

export default function ExportButtons() {
  const [isExporting, setIsExporting] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handlePDFExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    
    try {
      // Dynamically import jsPDF and html2canvas
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      
      // Capture the Power BI iframe container or main content
      const element = document.querySelector('.bg-white.rounded-2xl, .bg-white.dark\\:bg-gray-800') || document.querySelector('main');
      if (!element) throw new Error('Élément non trouvé');
      
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Rapport_JO_Tokyo2020_${new Date().toISOString().split('T')[0]}.pdf`);
      
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Échec export PDF:', error);
      alert('Échec de l\'export PDF. Veuillez réessayer.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center md:justify-end">
        <button
          onClick={handlePDFExport}
          disabled={isExporting}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
        >
          {isExporting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : exportSuccess ? (
            <Check className="w-5 h-5" />
          ) : (
            <FileDown className="w-5 h-5" />
          )}
          {isExporting ? 'Export en cours...' : exportSuccess ? 'Exporté !' : 'Télécharger PDF'}
        </button>
        
        <button
          onClick={() => setShowEmail(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
        >
          <Mail className="w-5 h-5" />
          Envoyer par Email
        </button>
      </div>

      <EmailDialog isOpen={showEmail} onClose={() => setShowEmail(false)} />
    </>
  );
}
