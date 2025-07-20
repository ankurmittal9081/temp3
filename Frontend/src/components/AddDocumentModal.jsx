import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../api/axiosConfig';

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.9 },
};

const AddDocumentModal = ({ isOpen, onClose, onSuccess }) => {
  const [issueId, setIssueId] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState(null); // State for the file object
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setDocumentFile(file);
        setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issueId || !documentType || !documentFile) {
      return toast.error("All fields, including a file, are required.");
    }
    setIsSubmitting(true);
    const loadingToast = toast.loading('Uploading and adding document...');

    // Use FormData to send a multipart request (text fields + file)
    const formData = new FormData();
    formData.append('issueId', issueId);
    formData.append('documentType', documentType);
    formData.append('documentFile', documentFile);

    try {
      // The apiClient is already configured to handle FormData
      await apiClient.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Document added successfully!', { id: loadingToast });
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to add document.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIssueId(''); setDocumentType(''); setDocumentFile(null); setFileName('');
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={handleClose}>
          <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Add a New Document</h3>
              <button onClick={handleClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700"><X /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <input value={issueId} onChange={(e) => setIssueId(e.target.value)} placeholder="Related Issue ID*" required className="input-style" />
                <input value={documentType} onChange={(e) => setDocumentType(e.target.value)} placeholder="Document Type (e.g., Aadhaar Card)*" required className="input-style" />
                
                {/* File Input UI */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Document File*</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="flex text-sm text-slate-500">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none p-1">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">PDF, PNG, JPG up to 10MB</p>
                      {fileName && <p className="text-sm text-green-400 mt-2">{fileName}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-4 bg-slate-900/50 border-t border-slate-700 rounded-b-xl">
                <button type="submit" disabled={isSubmitting} className="btn-primary w-auto flex items-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <Send size={16}/>}
                  {isSubmitting ? 'Uploading...' : 'Add Document'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddDocumentModal;