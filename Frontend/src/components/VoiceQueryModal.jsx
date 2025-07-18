import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, X, AlertTriangle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../api/axiosConfig'; // Use the central, interceptor-equipped Axios instance

// Animation variants for the modal pop-up
const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 200 } },
  exit: { opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.2 } },
};

const VoiceQueryModal = ({ isOpen, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [error, setError] = useState('');
  const [issueId, setIssueId] = useState(''); // State to hold the issue ID input
  const recognitionRef = useRef(null);

  // Initialize the browser's Speech Recognition API once on component mount
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser. Please use a modern browser like Chrome or Edge.');
      return;
    }
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN'; // Default to Hindi, can be changed based on user preference

    // Event handler for when speech is recognized
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
          finalTranscript += event.results[i][0].transcript;
      }
      setTranscribedText(prev => prev + finalTranscript);
    };

    // Event handler for speech recognition errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Mic error: ${event.error}. Please ensure microphone permission is granted.`);
        setIsRecording(false);
    };

    // Fired when the speech recognition service has disconnected
    recognition.onend = () => {
        setIsRecording(false);
    };
    
    recognitionRef.current = recognition;
  }, []); // Empty dependency array ensures this effect runs only once

  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setError('');
      setTranscribedText(''); // Clear previous text when starting a new recording
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSubmit = async () => {
    if (!transcribedText.trim()) {
      return toast.error('Please record your query before submitting.');
    }
    if (!issueId.trim()) {
      return toast.error('A related Legal Issue ID is required.');
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Submitting your query...');

    try {
      // Use the new apiClient instance for the API call
      await apiClient.post('/voicequeries', {
        issueId: issueId.trim(),
        spokenText: transcribedText,
        transcribedText: transcribedText,
        language: recognitionRef.current.lang
      });
      toast.success('Voice query submitted successfully!', { id: loadingToast });
      handleClose();
    } catch (err) {
      toast.error(err.message || 'Failed to submit query.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
      if (isRecording) {
        recognitionRef.current.stop();
      }
      // Reset all states for the next time the modal opens
      setIsRecording(false);
      setIsSubmitting(false);
      setTranscribedText('');
      setIssueId('');
      setError('');
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
              <h3 className="text-xl font-bold text-white">Record Your Query</h3>
              <button onClick={handleClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700 transition-colors"><X /></button>
            </div>

            <div className="p-6 space-y-4">
              {error && !error.includes("Speech recognition") ? (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-300 rounded-lg">
                    <AlertTriangle/>
                    <p>{error}</p>
                </div>
              ) : null}

              {error.includes("Speech recognition") ? (
                 <div className="flex flex-col items-center justify-center gap-2 p-4 bg-yellow-500/10 text-yellow-300 rounded-lg text-center">
                    <AlertTriangle size={32} />
                    <p className="font-semibold">Browser Not Supported</p>
                    <p className="text-sm">{error}</p>
                 </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="issueId" className="block text-sm font-medium text-slate-300 mb-1">Related Legal Issue ID*</label>
                    <input
                      id="issueId" type="text"
                      placeholder="Enter the ID of the related legal issue"
                      value={issueId} onChange={(e) => setIssueId(e.target.value)}
                      className="input-style"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="transcribedText" className="block text-sm font-medium text-slate-300 mb-1">Your Query</label>
                    <textarea
                      id="transcribedText" rows="5"
                      value={transcribedText} onChange={(e) => setTranscribedText(e.target.value)}
                      placeholder="Your recorded text will appear here... or you can type manually."
                      className="input-style w-full"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center pt-4">
                      <button 
                        onClick={handleToggleRecording}
                        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 text-white ${isRecording ? 'bg-red-600 animate-pulse ring-4 ring-red-600/50' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                      >
                          {isRecording ? <MicOff size={32}/> : <Mic size={32} />}
                      </button>
                      <p className="text-center text-sm text-slate-400 mt-2 h-4">
                        {isRecording ? 'Recording in progress... Click to stop.' : 'Click the microphone to start.'}
                      </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end p-4 bg-slate-900/50 border-t border-slate-700 rounded-b-xl">
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !transcribedText || !issueId || error.includes("Speech recognition")}
                className="btn-primary w-auto"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>}
                {isSubmitting ? 'Submitting...' : 'Submit Query'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceQueryModal;