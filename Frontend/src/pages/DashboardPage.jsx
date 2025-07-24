// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { useNavigate } from "react-router-dom"
// import apiClient from "../api/axiosConfig"
// import GlassCard from "../components/GlassCard"
// import Spinner from "../components/Spinner"
// import SmartAssistantModal from "../components/SmartAssistantModal"
// import AddIssueModal from "../components/AddIssueModal"
// import AddDocumentModal from "../components/AddDocumentModal"
// import {
//   FileText,
//   Trash2,
//   Plus,
//   MessageSquare,
//   AlertCircle,
//   Calendar,
//   BarChart3,
//   Eye,
//   ExternalLink,
//   MapPin,
// } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import toast from "react-hot-toast"
// import { useAuth } from "../context/AuthContext"

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// }

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// }

// const StatCard = ({ icon, title, value, color, onClick }) => (
//   <motion.div
//     variants={itemVariants}
//     whileHover={{ scale: 1.02 }}
//     className={`${color} p-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg`}
//     onClick={onClick}
//   >
//     <div className="flex items-center gap-4">
//       <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">{icon}</div>
//       <div>
//         <p className="text-white/80 text-sm">{title}</p>
//         <p className="text-2xl font-bold text-white">{value}</p>
//       </div>
//     </div>
//   </motion.div>
// )

// const DashboardPage = () => {
//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const [data, setData] = useState({ issues: [], documents: [] })
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [isSmartAssistantOpen, setSmartAssistantOpen] = useState(false)
//   const [isAddIssueModalOpen, setAddIssueModalOpen] = useState(false)
//   const [isAddDocumentModalOpen, setAddDocumentModalOpen] = useState(false)

//   const fetchData = useCallback(async () => {
//     try {
//       console.log("Fetching dashboard data...")
//       const [issuesResponse, documentsResponse] = await Promise.all([
//         apiClient.get("/citizens/issues"),
//         apiClient.get("/citizens/documents"),
//       ])

//       setData({
//         issues: issuesResponse.data.issues || [],
//         documents: documentsResponse.data.documents || [],
//       })
//     } catch (err) {
//       console.error("Dashboard fetch error:", err)
//       setError(err.message || "Failed to fetch your dashboard data.")
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   const handleDelete = async (type, id) => {
//     const itemType = type === "issues" ? "issue" : "document"
//     if (!window.confirm(`Are you sure you want to delete this ${itemType}?`)) return

//     const toastId = toast.loading(`Deleting ${itemType}...`)
//     try {
//       await apiClient.delete(`/${type}/${id}`)
//       toast.success(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully.`, { id: toastId })
//       fetchData()
//     } catch (err) {
//       toast.error(`Failed to delete ${itemType}: ${err.message}`, { id: toastId })
//     }
//   }

//   const handleViewDetails = (type, id) => {
//     navigate(`/${type}/${id}`)
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "resolved":
//         return "bg-green-500/20 text-green-300"
//       case "submitted":
//       case "in progress":
//         return "bg-blue-500/20 text-blue-300"
//       case "pending":
//         return "bg-yellow-500/20 text-yellow-300"
//       case "escalated":
//         return "bg-orange-500/20 text-orange-300"
//       default:
//         return "bg-gray-500/20 text-gray-300"
//     }
//   }

//   if (loading)
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <Spinner />
//       </div>
//     )

//   if (error)
//     return (
//       <div className="w-full max-w-4xl text-center p-8 bg-red-500/10 text-red-300 rounded-lg">
//         <AlertCircle className="mx-auto mb-4" size={48} />
//         <p className="font-semibold">An Error Occurred</p>
//         <p>{error}</p>
//       </div>
//     )

//   return (
//     <>
//       <motion.div
//         className="w-full max-w-7xl space-y-8"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Header Section */}
//         <motion.div className="flex flex-wrap justify-between items-center gap-4" variants={itemVariants}>
//           <div>
//             <h1 className="text-4xl font-bold text-white tracking-tight">Welcome back, {user?.fullName}!</h1>
//             <p className="text-slate-400 mt-2">Manage your legal issues and documents</p>
//           </div>

//           <div className="flex gap-3">
//             <button onClick={() => setSmartAssistantOpen(true)} className="btn-primary w-auto flex items-center gap-2">
//               <MessageSquare size={16} />
//               Smart Assistant
//             </button>
//           </div>
//         </motion.div>

//         {/* Stats Cards */}
//         <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={itemVariants}>
//           <StatCard
//             icon={<AlertCircle size={24} />}
//             title="Active Issues"
//             value={data.issues.filter((i) => i.status !== "Resolved").length}
//             color="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30"
//           />
//           <StatCard
//             icon={<FileText size={24} />}
//             title="Total Documents"
//             value={data.documents.length}
//             color="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
//           />
//           <StatCard
//             icon={<BarChart3 size={24} />}
//             title="Resolved Issues"
//             value={data.issues.filter((i) => i.status === "Resolved").length}
//             color="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30"
//           />
//         </motion.div>

//         {/* Legal Issues Section */}
//         <motion.div variants={itemVariants}>
//           <GlassCard>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold text-cyan-400 flex items-center gap-2">
//                 <AlertCircle size={24} />
//                 My Legal Issues
//               </h2>
//               <button onClick={() => setAddIssueModalOpen(true)} className="btn-secondary flex items-center gap-2">
//                 <Plus size={16} />
//                 Add Issue
//               </button>
//             </div>

//             {data.issues.length > 0 ? (
//               <div className="space-y-4">
//                 <AnimatePresence>
//                   {data.issues.map((issue) => (
//                     <motion.div
//                       layout
//                       key={issue._id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="p-6 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-slate-500 transition-all group"
//                     >
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-2">
//                             <h3 className="font-bold text-white text-lg">{issue.issueType}</h3>
//                             <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(issue.status)}`}>
//                               {issue.status}
//                             </span>
//                           </div>
//                           <p className="text-slate-300 mb-3 line-clamp-2">{issue.description}</p>
//                           <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
//                             <span className="flex items-center gap-1">
//                               <Calendar size={14} />
//                               {new Date(issue.createdAt).toLocaleDateString()}
//                             </span>
//                             {issue.kiosk && (
//                               <span className="flex items-center gap-1">
//                                 <MapPin size={14} />
//                                 {issue.kiosk.location}
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => handleViewDetails("issues", issue._id)}
//                               className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
//                             >
//                               <Eye size={14} />
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => handleDelete("issues", issue._id)}
//                           className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <div className="text-center py-12 text-slate-400">
//                 <AlertCircle className="mx-auto mb-4 text-cyan-400" size={48} />
//                 <p className="text-lg mb-2">No legal issues found</p>
//                 <p className="text-sm">
//                   Click "Add Issue" or use the Smart Assistant to create your first legal issue.
//                 </p>
//               </div>
//             )}
//           </GlassCard>
//         </motion.div>

//         {/* Documents Section */}
//         <motion.div variants={itemVariants}>
//           <GlassCard>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold text-cyan-400 flex items-center gap-2">
//                 <FileText size={24} />
//                 My Documents
//               </h2>
//               <button onClick={() => setAddDocumentModalOpen(true)} className="btn-secondary flex items-center gap-2">
//                 <Plus size={16} />
//                 Add Document
//               </button>
//             </div>

//             {data.documents.length > 0 ? (
//               <div className="space-y-4">
//                 <AnimatePresence>
//                   {data.documents.map((doc) => (
//                     <motion.div
//                       layout
//                       key={doc._id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="p-6 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-slate-500 transition-all group"
//                     >
//                       <div className="flex justify-between items-start">
//                         <div className="flex items-start gap-4 flex-1">
//                           <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
//                             <FileText className="text-cyan-400" size={20} />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-bold text-white text-lg mb-1">{doc.documentType}</h3>
//                             <div className="flex items-center gap-4 mb-3">
//                               <span
//                                 className={`text-xs px-3 py-1 rounded-full ${getStatusColor(doc.submissionStatus)}`}
//                               >
//                                 {doc.submissionStatus}
//                               </span>
//                               {doc.issueId && (
//                                 <span className="text-sm text-slate-400">Related to: {doc.issueId.issueType}</span>
//                               )}
//                             </div>
//                             <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
//                               <span className="flex items-center gap-1">
//                                 <Calendar size={14} />
//                                 {new Date(doc.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleViewDetails("documents", doc._id)}
//                                 className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
//                               >
//                                 <Eye size={14} />
//                                 View Details
//                               </button>
//                               <a
//                                 href={doc.fileUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm font-medium"
//                               >
//                                 <ExternalLink size={14} />
//                                 Open File
//                               </a>
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => handleDelete("documents", doc._id)}
//                           className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <div className="text-center py-12 text-slate-400">
//                 <FileText className="mx-auto mb-4 text-cyan-400" size={48} />
//                 <p className="text-lg mb-2">No documents found</p>
//                 <p className="text-sm">
//                   Click "Add Document" or use the Smart Assistant to upload your first document.
//                 </p>
//               </div>
//             )}
//           </GlassCard>
//         </motion.div>
//       </motion.div>

//       {/* Modals */}
//       <SmartAssistantModal
//         isOpen={isSmartAssistantOpen}
//         onClose={() => setSmartAssistantOpen(false)}
//         onSuccess={fetchData}
//       />
//       <AddIssueModal isOpen={isAddIssueModalOpen} onClose={() => setAddIssueModalOpen(false)} onSuccess={fetchData} />
//       <AddDocumentModal
//         isOpen={isAddDocumentModalOpen}
//         onClose={() => setAddDocumentModalOpen(false)}
//         onSuccess={fetchData}
//       />
//     </>
//   )
// }

// export default DashboardPage

"use client"

import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../api/axiosConfig"
import GlassCard from "../components/GlassCard"
import Spinner from "../components/Spinner"
import SmartAssistantModal from "../components/SmartAssistantModal"
import AddIssueModal from "../components/AddIssueModal"
import AddDocumentModal from "../components/AddDocumentModal"
import {
  FileText,
  Trash2,
  Plus,
  MessageSquare,
  AlertCircle,
  Calendar,
  BarChart3,
  Eye,
  ExternalLink,
  MapPin,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const StatCard = ({ icon, title, value, color, bgColor, iconColor, onClick }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, y: -2 }}
    className={`${color} p-6 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl border border-slate-200/50`}
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center shadow-md`}>
        <div className={iconColor}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-slate-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-black text-slate-800 mt-1">{value}</p>
      </div>
    </div>
  </motion.div>
)

const DashboardPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState({ issues: [], documents: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSmartAssistantOpen, setSmartAssistantOpen] = useState(false)
  const [isAddIssueModalOpen, setAddIssueModalOpen] = useState(false)
  const [isAddDocumentModalOpen, setAddDocumentModalOpen] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      console.log("Fetching dashboard data...")
      const [issuesResponse, documentsResponse] = await Promise.all([
        apiClient.get("/citizens/issues"),
        apiClient.get("/citizens/documents"),
      ])

      setData({
        issues: issuesResponse.data.issues || [],
        documents: documentsResponse.data.documents || [],
      })
    } catch (err) {
      console.error("Dashboard fetch error:", err)
      setError(err.message || "Failed to fetch your dashboard data.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDelete = async (type, id) => {
    const itemType = type === "issues" ? "issue" : "document"
    if (!window.confirm(`Are you sure you want to delete this ${itemType}?`)) return

    const toastId = toast.loading(`Deleting ${itemType}...`)
    try {
      await apiClient.delete(`/${type}/${id}`)
      toast.success(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully.`, { id: toastId })
      fetchData()
    } catch (err) {
      toast.error(`Failed to delete ${itemType}: ${err.message}`, { id: toastId })
    }
  }

  const handleViewDetails = (type, id) => {
    navigate(`/${type}/${id}`)
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-700 border border-green-200"
      case "submitted":
      case "in progress":
        return "bg-blue-100 text-blue-700 border border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200"
      case "escalated":
        return "bg-orange-100 text-orange-700 border border-orange-200"
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200"
    }
  }

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    )

  if (error)
    return (
      <div className="w-full max-w-4xl text-center p-8 bg-red-50 text-red-700 rounded-xl border border-red-200">
        <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
        <p className="font-semibold text-lg">An Error Occurred</p>
        <p className="mt-2">{error}</p>
      </div>
    )

  return (
    <>
      <motion.div
        className="w-full max-w-7xl space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="flex flex-wrap justify-between items-center gap-4" variants={itemVariants}>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Manage your legal issues and documents</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setSmartAssistantOpen(true)} 
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <MessageSquare size={16} />
              Smart Assistant
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={itemVariants}>
          <StatCard
            icon={<AlertCircle size={28} />}
            title="Active Issues"
            value={data.issues.filter((i) => i.status !== "Resolved").length}
            color="bg-white/95 backdrop-blur-xl"
            bgColor="bg-gradient-to-br from-red-100 to-pink-100"
            iconColor="text-red-600"
          />
          <StatCard
            icon={<FileText size={28} />}
            title="Total Documents"
            value={data.documents.length}
            color="bg-white/95 backdrop-blur-xl"
            bgColor="bg-gradient-to-br from-blue-100 to-cyan-100"
            iconColor="text-blue-600"
          />
          <StatCard
            icon={<BarChart3 size={28} />}
            title="Resolved Issues"
            value={data.issues.filter((i) => i.status === "Resolved").length}
            color="bg-white/95 backdrop-blur-xl"
            bgColor="bg-gradient-to-br from-green-100 to-emerald-100"
            iconColor="text-green-600"
          />
        </motion.div>

        {/* Legal Issues Section */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
                  <AlertCircle size={20} className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">My Legal Issues</h2>
              </div>
              <button 
                onClick={() => setAddIssueModalOpen(true)} 
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-white hover:shadow-sm transform hover:scale-105 transition-all duration-200 flex items-center gap-2 border border-slate-200/50"
              >
                <Plus size={16} />
                Add Issue
              </button>
            </div>

            {data.issues.length > 0 ? (
              <div className="space-y-4">
                <AnimatePresence>
                  {data.issues.map((issue) => (
                    <motion.div
                      layout
                      key={issue._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-6 bg-slate-50/80 rounded-xl border border-slate-200/50 hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-slate-800 text-lg">{issue.issueType}</h3>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(issue.status)}`}>
                              {issue.status}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-3 line-clamp-2 leading-relaxed">{issue.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(issue.createdAt).toLocaleDateString()}
                            </span>
                            {issue.kiosk && (
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {issue.kiosk.location}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewDetails("issues", issue._id)}
                              className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium hover:bg-cyan-50 px-2 py-1 rounded-md transition-all duration-200"
                            >
                              <Eye size={14} />
                              View Details
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete("issues", issue._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="text-red-500" size={32} />
                </div>
                <p className="text-lg font-semibold text-slate-700 mb-2">No legal issues found</p>
                <p className="text-sm">
                  Click "Add Issue" or use the Smart Assistant to create your first legal issue.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Documents Section */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">My Documents</h2>
              </div>
              <button 
                onClick={() => setAddDocumentModalOpen(true)} 
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-white hover:shadow-sm transform hover:scale-105 transition-all duration-200 flex items-center gap-2 border border-slate-200/50"
              >
                <Plus size={16} />
                Add Document
              </button>
            </div>

            {data.documents.length > 0 ? (
              <div className="space-y-4">
                <AnimatePresence>
                  {data.documents.map((doc) => (
                    <motion.div
                      layout
                      key={doc._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-6 bg-slate-50/80 rounded-xl border border-slate-200/50 hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                            <FileText className="text-blue-600" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-lg mb-1">{doc.documentType}</h3>
                            <div className="flex items-center gap-4 mb-3">
                              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(doc.submissionStatus)}`}>
                                {doc.submissionStatus}
                              </span>
                              {doc.issueId && (
                                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                  Related to: {doc.issueId.issueType}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(doc.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewDetails("documents", doc._id)}
                                className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium hover:bg-cyan-50 px-2 py-1 rounded-md transition-all duration-200"
                              >
                                <Eye size={14} />
                                View Details
                              </button>
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium hover:bg-green-50 px-2 py-1 rounded-md transition-all duration-200"
                              >
                                <ExternalLink size={14} />
                                Open File
                              </a>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete("documents", doc._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-blue-500" size={32} />
                </div>
                <p className="text-lg font-semibold text-slate-700 mb-2">No documents found</p>
                <p className="text-sm">
                  Click "Add Document" or use the Smart Assistant to upload your first document.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <SmartAssistantModal
        isOpen={isSmartAssistantOpen}
        onClose={() => setSmartAssistantOpen(false)}
        onSuccess={fetchData}
      />
      <AddIssueModal isOpen={isAddIssueModalOpen} onClose={() => setAddIssueModalOpen(false)} onSuccess={fetchData} />
      <AddDocumentModal
        isOpen={isAddDocumentModalOpen}
        onClose={() => setAddDocumentModalOpen(false)}
        onSuccess={fetchData}
      />
    </>
  )
}

export default DashboardPage