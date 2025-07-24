// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import { ArrowLeft, AlertCircle, Calendar, User, MapPin, Phone, FileText, Edit, Trash2 } from "lucide-react"
// import apiClient from "../api/axiosConfig"
// import GlassCard from "../components/GlassCard"
// import Spinner from "../components/Spinner"
// import toast from "react-hot-toast"

// const IssueDetailPage = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [issue, setIssue] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     const fetchIssue = async () => {
//       try {
//         const response = await apiClient.get(`/issues/${id}`)
//         setIssue(response.data.data)
//       } catch (err) {
//         setError(err.message || "Failed to fetch issue details")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchIssue()
//   }, [id])

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this issue?")) return

//     const toastId = toast.loading("Deleting issue...")
//     try {
//       await apiClient.delete(`/issues/${id}`)
//       toast.success("Issue deleted successfully", { id: toastId })
//       navigate("/dashboard")
//     } catch (err) {
//       toast.error(`Failed to delete issue: ${err.message}`, { id: toastId })
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "resolved":
//         return "bg-green-500/20 text-green-300 border-green-500/30"
//       case "submitted":
//       case "in progress":
//         return "bg-blue-500/20 text-blue-300 border-blue-500/30"
//       case "pending":
//         return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
//       case "escalated":
//         return "bg-orange-500/20 text-orange-300 border-orange-500/30"
//       default:
//         return "bg-gray-500/20 text-gray-300 border-gray-500/30"
//     }
//   }

//   if (loading) return <Spinner />
//   if (error) return <div className="text-red-400 p-4">{error}</div>
//   if (!issue) return <div className="text-slate-400 p-4">Issue not found</div>

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
//         >
//           <ArrowLeft size={20} />
//           Back to Dashboard
//         </button>
//         <div className="flex gap-2">
//           <button className="btn-secondary flex items-center gap-2">
//             <Edit size={16} />
//             Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//           >
//             <Trash2 size={16} />
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* Main Issue Details */}
//       <GlassCard>
//         <div className="flex items-start gap-4 mb-6">
//           <div className="w-16 h-16 rounded-lg bg-red-500/20 flex items-center justify-center">
//             <AlertCircle className="text-red-400" size={32} />
//           </div>
//           <div className="flex-1">
//             <h1 className="text-3xl font-bold text-white mb-2">{issue.issueType}</h1>
//             <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(issue.status)}`}>
//               {issue.status}
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <h3 className="text-lg font-semibold text-cyan-400 mb-2">Description</h3>
//             <p className="text-slate-300 leading-relaxed">{issue.description}</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-lg font-semibold text-cyan-400 mb-3">Issue Information</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <Calendar className="text-slate-400" size={16} />
//                   <span className="text-slate-300">Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Calendar className="text-slate-400" size={16} />
//                   <span className="text-slate-300">Updated: {new Date(issue.updatedAt).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-cyan-400 mb-3">User Information</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <User className="text-slate-400" size={16} />
//                   <span className="text-slate-300">{issue.userId.fullName}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Phone className="text-slate-400" size={16} />
//                   <span className="text-slate-300">{issue.userId.phoneNumber || "Not provided"}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {issue.kiosk && (
//             <div>
//               <h3 className="text-lg font-semibold text-cyan-400 mb-3">Kiosk Information</h3>
//               <div className="bg-slate-700/50 p-4 rounded-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <MapPin className="text-slate-400" size={16} />
//                   <span className="text-white font-medium">{issue.kiosk.location}</span>
//                 </div>
//                 <p className="text-slate-300 text-sm">
//                   {issue.kiosk.village}, {issue.kiosk.district}
//                 </p>
//                 <p className="text-slate-300 text-sm">Operator: {issue.kiosk.operatorName}</p>
//               </div>
//             </div>
//           )}

//           {issue.assignedParalegal && (
//             <div>
//               <h3 className="text-lg font-semibold text-cyan-400 mb-3">Assigned Paralegal</h3>
//               <div className="bg-slate-700/50 p-4 rounded-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <User className="text-slate-400" size={16} />
//                   <span className="text-white font-medium">{issue.assignedParalegal.user.fullName}</span>
//                 </div>
//                 <p className="text-slate-300 text-sm">Phone: {issue.assignedParalegal.phoneNumber}</p>
//                 <p className="text-slate-300 text-sm">
//                   Expertise: {issue.assignedParalegal.areasOfExpertise.join(", ")}
//                 </p>
//               </div>
//             </div>
//           )}

//           {issue.documents && issue.documents.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold text-cyan-400 mb-3">Related Documents</h3>
//               <div className="space-y-2">
//                 {issue.documents.map((doc) => (
//                   <div key={doc._id} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
//                     <FileText className="text-cyan-400" size={16} />
//                     <span className="text-white">{doc.documentType}</span>
//                     <span className="text-slate-400 text-sm">{new Date(doc.createdAt).toLocaleDateString()}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </GlassCard>
//     </motion.div>
//   )
// }

// export default IssueDetailPage
"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  AlertCircle,
  Calendar,
  User,
  MapPin,
  Phone,
  FileText,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react"
import apiClient from "../api/axiosConfig"
import GlassCard from "../components/GlassCard"
import Spinner from "../components/Spinner"
import toast from "react-hot-toast"

const IssueDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        console.log("Fetching issue with ID:", id)
        const response = await apiClient.get(`/issues/${id}`)
        console.log("Issue response:", response.data)
        setIssue(response.data.data)
      } catch (err) {
        console.error("Error fetching issue:", err)
        setError(err.message || "Failed to fetch issue details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchIssue()
    }
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return

    const toastId = toast.loading("Deleting issue...")
    try {
      await apiClient.delete(`/issues/${id}`)
      toast.success("Issue deleted successfully", { id: toastId })
      navigate("/dashboard")
    } catch (err) {
      toast.error(`Failed to delete issue: ${err.message}`, { id: toastId })
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "in progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "escalated":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  if (loading) return <Spinner />
  if (error) return <div className="text-red-400 p-4 text-center">{error}</div>
  if (!issue) return <div className="text-slate-400 p-4 text-center">Issue not found</div>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Edit size={16} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Main Issue Details */}
      <GlassCard>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-lg bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="text-red-400" size={32} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{issue.issueType}</h1>
            <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(issue.status)}`}>
              {issue.status}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Description</h3>
            <p className="text-slate-300 leading-relaxed">{issue.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Issue Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-slate-400" size={16} />
                  <span className="text-slate-300">Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-slate-400" size={16} />
                  <span className="text-slate-300">Updated: {new Date(issue.updatedAt).toLocaleDateString()}</span>
                </div>
                {issue.priority && (
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-slate-400" size={16} />
                    <span className="text-slate-300">Priority: {issue.priority}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">User Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="text-slate-400" size={16} />
                  <span className="text-slate-300">{issue.userId.fullName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-slate-400" size={16} />
                  <span className="text-slate-300">{issue.userId.phoneNumber || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="text-slate-400" size={16} />
                  <span className="text-slate-300">{issue.userId.email}</span>
                </div>
              </div>
            </div>
          </div>

          {issue.kiosk && (
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Kiosk Information</h3>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-slate-400" size={16} />
                  <span className="text-white font-medium">{issue.kiosk.location}</span>
                </div>
                <p className="text-slate-300 text-sm">
                  {issue.kiosk.village}, {issue.kiosk.district}
                </p>
                <p className="text-slate-300 text-sm">Operator: {issue.kiosk.operatorName}</p>
                {issue.kiosk.organizationType && (
                  <p className="text-slate-300 text-sm">Organization: {issue.kiosk.organizationType}</p>
                )}
              </div>
            </div>
          )}

          {issue.assignedParalegal && (
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Assigned Paralegal</h3>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-slate-400" size={16} />
                  <span className="text-white font-medium">
                    {issue.assignedParalegal.user?.fullName || "Not assigned"}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">Phone: {issue.assignedParalegal.phoneNumber}</p>
                <p className="text-slate-300 text-sm">
                  Expertise: {issue.assignedParalegal.areasOfExpertise?.join(", ") || "General"}
                </p>
              </div>
            </div>
          )}

          {issue.documents && issue.documents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Related Documents</h3>
              <div className="space-y-2">
                {issue.documents.map((doc) => (
                  <div key={doc._id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="text-cyan-400" size={16} />
                      <div>
                        <span className="text-white">{doc.documentType}</span>
                        <p className="text-slate-400 text-sm">{new Date(doc.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default IssueDetailPage