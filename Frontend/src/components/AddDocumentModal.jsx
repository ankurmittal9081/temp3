import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../api/axiosConfig';

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 200 } },
  exit: { opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.2 } },
};

const AddDocumentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    issueId: '',
    documentType: '',
    fileUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.issueId || !formData.documentType || !formData.fileUrl) {
      return toast.error("All fields are required.");
    }
    setIsSubmitting(true);
    const loadingToast = toast.loading('Adding new document...');

    try {
      await apiClient.post('/documents', formData);
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
    setFormData({ issueId: '', documentType: '', fileUrl: '' });
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            variants={modalVariants} initial="hidden" animate="visible" exit="exit"
            className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Add a New Document</h3>
              <button onClick={handleClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700 transition-colors"><X /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <input name="issueId" placeholder="Related Issue ID*" onChange={handleChange} required className="input-style" />
                <input name="documentType" placeholder="Document Type (e.g., Aadhaar Card)*" onChange={handleChange} required className="input-style" />
                <input name="fileUrl" placeholder="File URL (e.g., https://...)*" onChange={handleChange} required className="input-style" />
              </div>

              <div className="flex justify-end p-4 bg-slate-900/50 border-t border-slate-700 rounded-b-xl">
                <button type="submit" disabled={isSubmitting} className="btn-primary w-auto flex items-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <Send size={16}/>}
                  {isSubmitting ? 'Submitting...' : 'Add Document'}
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