"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { User, Mail, Lock, CreditCard, Users, Building, Phone, Award } from "lucide-react"

const RegisterPage = () => {
  const { register, isAuthenticated, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    aadhaarNumber: "",
    role: "citizen",
    phoneNumber: "",
    // Role-specific fields
    department: "",
    designation: "",
    areasOfExpertise: [],
    assignedDistricts: [],
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "areasOfExpertise") {
      const currentAreas = formData.areasOfExpertise || []
      if (checked) {
        setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
      } else {
        setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
      }
    } else if (name === "assignedDistricts") {
      setFormData({ ...formData, assignedDistricts: value.split(",").map((d) => d.trim()) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Prepare data based on role
      const submitData = { ...formData }

      // Clean up role-specific data
      if (formData.role === "citizen") {
        delete submitData.department
        delete submitData.designation
        delete submitData.areasOfExpertise
        delete submitData.assignedDistricts
      } else if (formData.role === "employee") {
        delete submitData.areasOfExpertise
        delete submitData.assignedDistricts
      } else if (formData.role === "paralegal") {
        delete submitData.department
        delete submitData.designation
        delete submitData.assignedDistricts
      } else if (formData.role === "admin") {
        delete submitData.department
        delete submitData.designation
        delete submitData.areasOfExpertise
      }

      await register(submitData)
    } catch (err) {
      setError(err.message || "Registration failed.")
    } finally {
      setLoading(false)
    }
  }

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "employee":
        return (
          <>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Department *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    name="department"
                    placeholder="Legal Helpdesk"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="input-style pl-10"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Designation *</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    name="designation"
                    placeholder="Field Officer"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="input-style pl-10"
                  />
                </div>
              </div>
            </div>
          </>
        )

      case "paralegal":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  name="phoneNumber"
                  placeholder="9876543210"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  title="Must be 10 digits"
                  className="input-style pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Areas of Expertise *</label>
              <div className="grid grid-cols-2 gap-2">
                {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
                  <label key={area} className="flex items-center gap-2 text-slate-300">
                    <input
                      type="checkbox"
                      name="areasOfExpertise"
                      value={area}
                      checked={formData.areasOfExpertise.includes(area)}
                      onChange={handleChange}
                      className="rounded border-slate-600 bg-slate-700 text-cyan-600 focus:ring-cyan-500"
                    />
                    {area}
                  </label>
                ))}
              </div>
            </div>
          </>
        )

      case "admin":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Assigned Districts</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  name="assignedDistricts"
                  placeholder="Mathura, Agra (comma-separated)"
                  value={formData.assignedDistricts.join(", ")}
                  onChange={handleChange}
                  className="input-style pl-10"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Enter district names separated by commas</p>
            </div>
          </>
        )

      default:
        return null
    }
  }

  const getRoleDescription = (role) => {
    switch (role) {
      case "citizen":
        return "Access legal help and manage your issues"
      case "employee":
        return "Help citizens with legal processes at kiosks"
      case "paralegal":
        return "Provide legal guidance and support"
      case "admin":
        return "Manage system and oversee operations"
      default:
        return ""
    }
  }

  if (isLoading) return <Spinner />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <div className="w-full max-w-5xl mx-auto flex rounded-xl shadow-2xl overflow-hidden bg-slate-800/80 backdrop-blur-sm border border-slate-700 my-8">
      {/* Image Side */}
      <div className="hidden lg:block lg:w-2/5">
        <img
          src="/login-background.png"
          alt="Community hands together, a sign of unity and support"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-3/5 p-8 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
          <p className="text-slate-400">Join NyayaSaathi to access legal help</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Select Your Role *</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "citizen", label: "Citizen", icon: <User size={16} /> },
                { value: "employee", label: "Employee", icon: <Users size={16} /> },
                { value: "paralegal", label: "Paralegal", icon: <Award size={16} /> },
                { value: "admin", label: "Admin", icon: <Building size={16} /> },
              ].map((role) => (
                <label
                  key={role.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.role === role.value
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                      : "border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {role.icon}
                  <div>
                    <div className="font-medium">{role.label}</div>
                    <div className="text-xs opacity-75">{getRoleDescription(role.value)}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="input-style pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-style pl-10"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    name="password"
                    type="password"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="input-style pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Aadhaar Number *</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  name="aadhaarNumber"
                  placeholder="12-digit Aadhaar number"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  required
                  pattern="\d{12}"
                  title="Must be 12 digits"
                  className="input-style pl-10"
                />
              </div>
            </div>
          </div>

          {/* Role-specific fields */}
          {renderRoleSpecificFields()}

          <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-3">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
