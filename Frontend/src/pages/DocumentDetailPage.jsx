"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Calendar, User, ExternalLink, Download, Edit, Trash2, AlertCircle } from "lucide-react"
import apiClient from "../api/axiosConfig"
import GlassCard from "../components/GlassCard"
import Spinner from "../components/Spinner"
import toast from "react-hot-toast"

const DocumentDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await apiClient.get(`/documents/${id}`)
        setDocument(response.data.data)
      } catch (err) {
        setError(err.message || "Failed to fetch document details")
      } finally {
        setLoading(false)
      }
    }

    fetchDocument()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this document?")) return

    const toastId = toast.loading("Deleting document...")
    try {
      await apiClient.delete(`/documents/${id}`)
      toast.success("Document deleted successfully", { id: toastId })
      navigate("/dashboard")
    } catch (err) {
      toast.error(`Failed to delete document: ${err.message}`, { id: toastId })
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "submitted":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "not_submitted":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  if (loading) return <Spinner />
  if (error) return <div className="text-red-400 p-4">{error}</div>
  if (!document) return <div className="text-slate-400 p-4">Document not found</div>

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
          <a
            href={document.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <ExternalLink size={16} />
            Open File
          </a>
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

      {/* Main Document Details */}
      <GlassCard>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <FileText className="text-blue-400" size={32} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{document.documentType}</h1>
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(document.submissionStatus)}`}
            >
              {document.submissionStatus.replace("_", " ").toUpperCase()}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Document Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-slate-400" size={16} />
                  <span className="text-slate-300">Uploaded: {new Date(document.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="text-slate-400" size={16} />
                  <span className="text-slate-300">Uploaded by: {document.uploadedBy}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">User Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="text-slate-400" size={16} />
                  <span className="text-slate-300">{document.userId.fullName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-slate-300">{document.userId.email}</span>
                </div>
              </div>
            </div>
          </div>

          {document.issueId && (
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Related Issue</h3>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="text-orange-400" size={16} />
                  <span className="text-white font-medium">{document.issueId.issueType}</span>
                </div>
                <p className="text-slate-300 text-sm mb-2">{document.issueId.description}</p>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getStatusColor(document.issueId.status)}`}
                >
                  {document.issueId.status}
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">File Access</h3>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Document File</p>
                  <p className="text-slate-400 text-sm">Click to view or download the document</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={document.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View
                  </a>
                  <a
                    href={document.fileUrl}
                    download
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default DocumentDetailPage