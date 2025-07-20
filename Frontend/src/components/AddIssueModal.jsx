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

const AddIssueModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    issueType: 'Other',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description) {
        return toast.error("Description is required.");
    }
    setIsSubmitting(true);
    const loadingToast = toast.loading('Creating new issue...');

    try {
      await apiClient.post('/issues', formData);
      toast.success('Legal issue created successfully!', { id: loadingToast });
      onSuccess(); // This will trigger a data refresh on the dashboard
      onClose(); // Close the modal
    } catch (err) {
      toast.error(err.message || 'Failed to create issue.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
      setFormData({ issueType: 'Other', description: '' });
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
              <h3 className="text-xl font-bold text-white">Create a New Legal Issue</h3>
              <button onClick={handleClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700 transition-colors"><X /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="issueType" className="block text-sm font-medium text-slate-300 mb-1">Issue Type*</label>
                  <select id="issueType" name="issueType" value={formData.issueType} onChange={handleChange} className="input-style">
                    <option value="Aadhaar Issue">Aadhaar Issue</option>
                    <option value="Pension Issue">Pension Issue</option>
                    <option value="Land Dispute">Land Dispute</option>
                    <option value="Court Summon">Court Summon</option>
                    <option value="Certificate Missing">Certificate Missing</option>
                    <option value="Fraud Case">Fraud Case</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Description*</label>
                  <textarea
                    id="description" name="description" rows="4"
                    value={formData.description} onChange={handleChange}
                    placeholder="Briefly describe your legal issue."
                    className="input-style w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end p-4 bg-slate-900/50 border-t border-slate-700 rounded-b-xl">
                <button type="submit" disabled={isSubmitting} className="btn-primary w-auto flex items-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <Send size={16}/>}
                  {isSubmitting ? 'Submitting...' : 'Submit Issue'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddIssueModal;