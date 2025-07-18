import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import request from '../api/api';

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const VoiceQueryModal = ({ isOpen, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [error, setError] = useState('');
  const [issueId, setIssueId] = useState(''); // State to hold the issue ID input
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition API
  useEffect(() => {
    // Check if the browser supports the API
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    
    // Create a new recognition instance
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;  // Keep listening even after a pause
    recognition.interimResults = true; // Show results as they are being recorded
    recognition.lang = 'hi-IN'; // Default to Hindi, can be changed based on user preference

    // Event handler for when speech is recognized
    recognition.onresult = (event) => {
      let finalTranscript = transcribedText; // Keep existing text if user re-records
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscribedText(finalTranscript);
    };

    // Event handler for errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}. Please try again.`);
        setIsRecording(false);
    }
    
    recognitionRef.current = recognition;
  }, [transcribedText]); // Rerun effect if transcribed text is manually changed

  // Function to start/stop recording
  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      // Don't clear text, allowing users to append recordings
      // setTranscribedText(''); 
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!transcribedText) {
      return toast.error('Please record your query before submitting.');
    }
    if (!issueId.trim()) {
        return toast.error('A related Legal Issue ID is required.');
    }

    const loadingToast = toast.loading('Submitting your query...');

    try {
      await request('/voicequeries', 'POST', {
        issueId: issueId.trim(),
        spokenText: transcribedText,
        transcribedText: transcribedText, // On the backend, you could differentiate these
        language: recognitionRef.current.lang
      });
      toast.success('Voice query submitted successfully!', { id: loadingToast });
      handleClose(); // Close and reset the modal
    } catch (err) {
      toast.error(err.message || 'Failed to submit query.', { id: loadingToast });
    }
  };
  
  // Cleanly close the modal and stop recording
  const handleClose = () => {
      if (isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }
      // Reset state for next time it opens
      setTranscribedText('');
      setIssueId('');
      setError('');
      onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Record Your Query</h3>
              <button onClick={handleClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700"><X /></button>
            </div>

            <div className="p-6 space-y-4">
              {error ? (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-300 rounded-lg">
                    <AlertTriangle/>
                    <p>{error}</p>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="issueId" className="block text-sm font-medium text-slate-300 mb-1">Related Legal Issue ID*</label>
                    <input
                      id="issueId"
                      type="text"
                      placeholder="Enter the ID of the related issue"
                      value={issueId}
                      onChange={(e) => setIssueId(e.target.value)}
                      className="input-style"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="transcribedText" className="block text-sm font-medium text-slate-300 mb-1">Your Query</label>
                    <textarea
                      id="transcribedText"
                      rows="5"
                      value={transcribedText}
                      onChange={(e) => setTranscribedText(e.target.value)}
                      placeholder="Your recorded text will appear here... or you can type manually."
                      className="input-style w-full"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center pt-4">
                      <button 
                        onClick={handleToggleRecording}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 text-white ${isRecording ? 'bg-red-600 animate-pulse ring-4 ring-red-600/50' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                      >
                          {isRecording ? <MicOff size={32}/> : <Mic size={32} />}
                      </button>
                      <p className="text-center text-sm text-slate-400 mt-2">{isRecording ? 'Recording in progress... Click to stop.' : 'Click the microphone to start recording.'}</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end p-4 bg-slate-900/50 border-t border-slate-700 rounded-b-xl">
              <button onClick={handleSubmit} disabled={!transcribedText || !!error} className="btn-primary w-auto flex items-center gap-2">
                <Send size={16}/> Submit Query
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceQueryModal;