"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  CreditCard,
  Home,
  Gavel,
  Users,
  BookOpen,
  Mic,
  MicOff,
  Send,
  MessageSquare,
  Loader2,
  Volume2,
  VolumeX,
  Globe,
  Search,
  ArrowLeft,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import GlassCard from "../../components/GlassCard"

const LegalHelpPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [mode, setMode] = useState("text")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [input, setInput] = useState("")
  const [conversation, setConversation] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const recognitionRef = useRef(null)
  const speechSynthRef = useRef(null)

  // Legal categories
  const legalCategories = [
    {
      id: "aadhaar",
      icon: <CreditCard size={24} />,
      title: i18n.language === "hi" ? "आधार कार्ड" : "Aadhaar Card",
      description: i18n.language === "hi" ? "आधार संबंधी सभी सेवाएं" : "All Aadhaar related services",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    },
    {
      id: "pension",
      icon: <Users size={24} />,
      title: i18n.language === "hi" ? "पेंशन योजनाएं" : "Pension Schemes",
      description: i18n.language === "hi" ? "सभी पेंशन योजनाओं की जानकारी" : "Information about all pension schemes",
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    },
    {
      id: "land",
      icon: <Home size={24} />,
      title: i18n.language === "hi" ? "भूमि और संपत्ति" : "Land & Property",
      description: i18n.language === "hi" ? "भूमि विवाद और संपत्ति कानून" : "Land disputes and property laws",
      color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
    },
    {
      id: "court",
      icon: <Gavel size={24} />,
      title: i18n.language === "hi" ? "न्यायालय प्रक्रिया" : "Court Procedures",
      description: i18n.language === "hi" ? "न्यायालय की कार्यवाही और प्रक्रिया" : "Court proceedings and procedures",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    },
    {
      id: "certificates",
      icon: <FileText size={24} />,
      title: i18n.language === "hi" ? "प्रमाणपत्र" : "Certificates",
      description: i18n.language === "hi" ? "सभी प्रकार के प्रमाणपत्र" : "All types of certificates",
      color: "from-teal-500/20 to-blue-500/20 border-teal-500/30",
    },
    {
      id: "rights",
      icon: <BookOpen size={24} />,
      title: i18n.language === "hi" ? "अधिकार और कानून" : "Rights & Laws",
      description:
        i18n.language === "hi" ? "मौलिक अधिकार और कानूनी जानकारी" : "Fundamental rights and legal information",
      color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
    },
  ]

  // Comprehensive legal knowledge base
  const legalKnowledge = {
    en: {
      aadhaar: {
        update: {
          title: "How to Update Aadhaar Card",
          content: `**Step-by-step process to update your Aadhaar:**

1. **Visit Aadhaar Center**: Go to nearest Aadhaar enrollment/update center
2. **Required Documents**: 
   - Original Aadhaar card
   - Proof of Identity (PAN, Passport, Driving License)
   - Proof of Address (if updating address)
   - Proof of Date of Birth (if updating DOB)
3. **Fill Form**: Complete Aadhaar correction/update form
4. **Biometric Verification**: Provide fingerprints and iris scan
5. **Pay Fee**: ₹50 for demographic updates, ₹100 for biometric updates
6. **Get Receipt**: Keep acknowledgment slip with URN number
7. **Track Status**: Check status online using URN
8. **Receive Updated Aadhaar**: Takes 90 days to process

**Online Update Options:**
- Name, address, mobile, email can be updated online
- Visit uidai.gov.in for self-service updates
- OTP verification required for online updates

**Important Notes:**
- Free updates within 90 days of enrollment
- Supporting documents must be valid and clear
- Address proof must be recent (within 3 months)`,
        },
        lost: {
          title: "Lost Aadhaar Card - What to Do",
          content: `**If your Aadhaar card is lost or stolen:**

1. **File Police Complaint**: 
   - Go to nearest police station
   - File FIR for lost/stolen Aadhaar
   - Get copy of FIR

2. **Apply for Duplicate**:
   - Visit Aadhaar center with FIR copy
   - Fill duplicate Aadhaar form
   - Provide biometric verification
   - Pay ₹50 fee

3. **Alternative - Download e-Aadhaar**:
   - Visit uidai.gov.in
   - Click "Download Aadhaar"
   - Enter Aadhaar number/VID and OTP
   - Download PDF copy (legally valid)

4. **Get Aadhaar PVC Card**:
   - Order physical PVC card online
   - Pay ₹50 + GST
   - Delivered to registered address

**Emergency Use**:
- e-Aadhaar is legally valid everywhere
- Can be used for all government services
- Print on normal paper, no special paper needed`,
        },
      },
      court: {
        summons: {
          title: "How to Respond to Court Summons",
          content: `**Court Summons - What You Need to Know:**

**What is a Court Summons:**
- Legal notice to appear in court
- Issued by court clerk/judge
- Contains case details and date
- Mandatory to respond

**What to Do When You Receive Summons:**

**Step 1 - Don't Ignore**
- Never ignore court summons
- Serious legal consequences if ignored
- Warrant may be issued for arrest

**Step 2 - Read Carefully**
- Note the court name and address
- Check date and time to appear
- Understand the case details
- Note case number

**Step 3 - Gather Documents**
- Collect all relevant papers
- Organize evidence in your favor
- Get witness statements if needed
- Prepare your defense

**Step 4 - Consider Legal Help**
- Hire a lawyer if case is serious
- Get free legal aid if eligible
- Consult with legal advisor
- Understand your rights

**Step 5 - Appear in Court**
- Reach court 30 minutes early
- Dress formally and respectfully
- Bring all documents
- Follow court procedures

**If You Cannot Attend:**
1. File application for adjournment
2. Provide valid reason
3. Submit medical certificate if ill
4. Send authorized representative
5. Inform court in advance

**Consequences of Not Appearing:**
- Ex-parte judgment against you
- Arrest warrant issued
- Fine or imprisonment
- Loss of case by default
- Contempt of court charges`,
        },
      },
    },
    hi: {
      aadhaar: {
        update: {
          title: "आधार कार्ड कैसे अपडेट करें",
          content: `**आधार अपडेट करने की चरणबद्ध प्रक्रिया:**

1. **आधार केंद्र जाएं**: निकटतम आधार नामांकन/अपडेट केंद्र जाएं
2. **आवश्यक दस्तावेज**: 
   - मूल आधार कार्ड
   - पहचान प्रमाण (पैन, पासपोर्ट, ड्राइविंग लाइसेंस)
   - पता प्रमाण (यदि पता अपडेट कर रहे हैं)
3. **फॉर्म भरें**: आधार सुधार/अपडेट फॉर्म पूरा करें
4. **बायोमेट्रिक सत्यापन**: फिंगरप्रिंट और आईरिस स्कैन दें
5. **फीस दें**: जनसांख्यिकीय अपडेट के लिए ₹50
6. **रसीद लें**: URN नंबर के साथ पावती पर्ची रखें

**ऑनलाइन अपडेट विकल्प:**
- नाम, पता, मोबाइल, ईमेल ऑनलाइन अपडेट हो सकते हैं
- सेल्फ-सर्विस अपडेट के लिए uidai.gov.in पर जाएं`,
        },
      },
    },
  }

  // Initialize speech recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return

    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = i18n.language === "hi" ? "hi-IN" : "en-US"

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      handleInput(transcript)
    }

    recognition.onerror = (event) => {
      toast.error(`Speech recognition error: ${event.error}`)
      setIsRecording(false)
    }

    recognition.onend = () => setIsRecording(false)
    recognitionRef.current = recognition
  }, [i18n.language])

  // Initialize speech synthesis
  useEffect(() => {
    if ("speechSynthesis" in window) {
      speechSynthRef.current = window.speechSynthesis
    }
  }, [])

  const addMessage = (message, isUser = false) => {
    setConversation((prev) => [...prev, { message, isUser, timestamp: Date.now() }])
  }

  const speakText = (text) => {
    if (!speechSynthRef.current) return

    // Stop any ongoing speech
    speechSynthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = i18n.language === "hi" ? "hi-IN" : "en-US"
    utterance.rate = 0.8
    utterance.pitch = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthRef.current.speak(utterance)
  }

  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const handleVoiceToggle = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
    } else {
      setInput("")
      if (recognitionRef.current) {
        recognitionRef.current.lang = i18n.language === "hi" ? "hi-IN" : "en-US"
        recognitionRef.current.start()
      }
      setIsRecording(true)
    }
  }

  const handleInput = async (inputText) => {
    if (!inputText.trim()) return

    addMessage(inputText, true)
    setInput("")
    setIsProcessing(true)

    try {
      const response = await processLegalQuery(inputText)
      addMessage(response)

      // Auto-speak response if voice mode is active
      if (mode === "voice") {
        speakText(response)
      }
    } catch (error) {
      addMessage(`Error: ${error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const processLegalQuery = async (query) => {
    const lowerQuery = query.toLowerCase()
    const currentLang = i18n.language
    const knowledge = legalKnowledge[currentLang] || legalKnowledge.en

    // Document summarization
    if (lowerQuery.includes("summarize") || lowerQuery.includes("summary") || lowerQuery.includes("सारांश")) {
      return currentLang === "hi"
        ? "कृपया अपना दस्तावेज़ अपलोड करें या टेक्स्ट पेस्ट करें। मैं इसका सारांश तैयार करूंगा और मुख्य बिंदुओं को समझाऊंगा।"
        : "Please upload your document or paste the text. I'll provide a summary and explain the key points in simple terms."
    }

    // Aadhaar related queries
    if (lowerQuery.includes("aadhaar") || lowerQuery.includes("आधार")) {
      if (lowerQuery.includes("update") || lowerQuery.includes("अपडेट")) {
        return knowledge.aadhaar?.update?.content || "Information about Aadhaar updates..."
      } else if (lowerQuery.includes("lost") || lowerQuery.includes("खो")) {
        return knowledge.aadhaar?.lost?.content || "Information about lost Aadhaar..."
      }
      return knowledge.aadhaar?.update?.content || "General Aadhaar information..."
    }

    // Court related queries
    if (lowerQuery.includes("court") || lowerQuery.includes("कोर्ट") || lowerQuery.includes("न्यायालय")) {
      if (lowerQuery.includes("summons") || lowerQuery.includes("समन")) {
        return knowledge.court?.summons?.content || "Information about court summons..."
      }
      return knowledge.court?.summons?.content || "General court information..."
    }

    // Default response
    return currentLang === "hi"
      ? "मैं आपकी कानूनी समस्याओं में मदद कर सकता हूं। आधार, पेंशन, भूमि, न्यायालय, और प्रमाणपत्र के बारे में पूछें।"
      : "I can help with your legal queries about Aadhaar, pension, land, court procedures, and certificates. What would you like to know?"
  }

  const filteredCategories = legalCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{i18n.language === "hi" ? "कानूनी सहायता" : "Legal Help"}</h1>
            <p className="text-slate-400">
              {i18n.language === "hi"
                ? "भारत में कानूनी प्रक्रियाओं की जानकारी प्राप्त करें"
                : "Get information about legal procedures in India"}
            </p>
          </div>
        </div>
        <button
          onClick={() => i18n.changeLanguage(i18n.language === "hi" ? "en" : "hi")}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
        >
          <Globe size={16} />
          {i18n.language === "hi" ? "English" : "हिंदी"}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder={i18n.language === "hi" ? "कानूनी विषय खोजें..." : "Search legal topics..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Legal Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-gradient-to-br ${category.color} p-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg border`}
            onClick={() => setSelectedCategory(category)}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">{category.icon}</div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">{category.title}</h3>
                <p className="text-white/80 text-sm">{category.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Assistant */}
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-cyan-400">
            {i18n.language === "hi" ? "AI कानूनी सहायक" : "AI Legal Assistant"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("text")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                mode === "text" ? "bg-cyan-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <MessageSquare size={16} />
              {i18n.language === "hi" ? "टेक्स्ट" : "Text"}
            </button>
            <button
              onClick={() => setMode("voice")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                mode === "voice" ? "bg-cyan-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <Mic size={16} />
              {i18n.language === "hi" ? "आवाज़" : "Voice"}
            </button>
          </div>
        </div>

        {/* Conversation */}
        <div className="h-96 overflow-y-auto space-y-4 mb-6 p-4 bg-slate-900/50 rounded-lg">
          {conversation.length === 0 && (
            <div className="text-center text-slate-400 py-8">
              <BookOpen className="mx-auto mb-4 text-cyan-400" size={48} />
              <p className="text-lg mb-2">
                {i18n.language === "hi"
                  ? "आज मैं आपकी कैसे मदद कर सकता हूं?"
                  : "How can I help you with legal matters today?"}
              </p>
              <p className="text-sm">
                {i18n.language === "hi"
                  ? "पूछें: 'आधार कार्ड कैसे अपडेट करें', 'कोर्ट समन का जवाब कैसे दें'"
                  : "Try: 'How to update Aadhaar card', 'How to respond to court summons'"}
              </p>
            </div>
          )}

          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser ? "bg-cyan-600 text-white" : "bg-slate-700 text-slate-200"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.message}</div>
                {!msg.isUser && (
                  <button
                    onClick={() => speakText(msg.message)}
                    className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Volume2 size={12} />
                    {i18n.language === "hi" ? "सुनें" : "Listen"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-slate-200 p-3 rounded-lg flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} />
                {i18n.language === "hi" ? "प्रोसेसिंग..." : "Processing..."}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="space-y-4">
          {mode === "text" ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleInput(input)}
                placeholder={i18n.language === "hi" ? "अपना प्रश्न टाइप करें..." : "Type your legal question..."}
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isProcessing}
              />
              <button
                onClick={() => handleInput(input)}
                disabled={isProcessing || !input.trim()}
                className="btn-primary w-auto flex items-center gap-2"
              >
                <Send size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleVoiceToggle}
                  disabled={isProcessing}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all ${
                    isRecording ? "bg-red-600 animate-pulse" : "bg-cyan-600 hover:bg-cyan-700"
                  }`}
                >
                  {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center text-white"
                  >
                    <VolumeX size={20} />
                  </button>
                )}
              </div>
              <p className="text-center text-sm text-slate-400">
                {isRecording
                  ? i18n.language === "hi"
                    ? "सुन रहा हूं... रोकने के लिए क्लिक करें"
                    : "Listening... Click to stop"
                  : i18n.language === "hi"
                    ? "बोलना शुरू करने के लिए क्लिक करें"
                    : "Click to start speaking"}
              </p>
              {input && <div className="w-full p-3 bg-slate-900 rounded-lg text-center text-slate-200">"{input}"</div>}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Category Detail Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl border border-slate-700 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  {selectedCategory.icon}
                  <h2 className="text-2xl font-bold text-white">{selectedCategory.title}</h2>
                </div>
                <p className="text-slate-300 mb-4">{selectedCategory.description}</p>
                <div className="text-slate-300">
                  <p>
                    {i18n.language === "hi"
                      ? "इस विषय के बारे में अधिक जानकारी के लिए AI असिस्टेंट से पूछें।"
                      : "Ask the AI assistant for more detailed information about this topic."}
                  </p>
                </div>
                <button onClick={() => setSelectedCategory(null)} className="mt-6 btn-primary w-full">
                  {i18n.language === "hi" ? "बंद करें" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LegalHelpPage