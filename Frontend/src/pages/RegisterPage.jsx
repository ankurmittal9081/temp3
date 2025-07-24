// // "use client"

// // import { useState } from "react"
// // import { useAuth } from "../context/AuthContext"
// // import { Link, Navigate } from "react-router-dom"
// // import Spinner from "../components/Spinner"
// // import { User, Mail, Lock, CreditCard, Users, Building, Phone, Award } from "lucide-react"

// // const RegisterPage = () => {
// //   const { register, isAuthenticated, isLoading } = useAuth()
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     password: "",
// //     aadhaarNumber: "",
// //     role: "citizen",
// //     phoneNumber: "",
// //     // Role-specific fields
// //     department: "",
// //     designation: "",
// //     areasOfExpertise: [],
// //     assignedDistricts: [],
// //   })
// //   const [error, setError] = useState(null)
// //   const [loading, setLoading] = useState(false)

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target

// //     if (name === "areasOfExpertise") {
// //       const currentAreas = formData.areasOfExpertise || []
// //       if (checked) {
// //         setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
// //       } else {
// //         setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
// //       }
// //     } else if (name === "assignedDistricts") {
// //       setFormData({ ...formData, assignedDistricts: value.split(",").map((d) => d.trim()) })
// //     } else {
// //       setFormData({ ...formData, [name]: value })
// //     }
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setError(null)
// //     setLoading(true)

// //     try {
// //       // Prepare data based on role
// //       const submitData = { ...formData }

// //       // Clean up role-specific data
// //       if (formData.role === "citizen") {
// //         delete submitData.department
// //         delete submitData.designation
// //         delete submitData.areasOfExpertise
// //         delete submitData.assignedDistricts
// //       } else if (formData.role === "employee") {
// //         delete submitData.areasOfExpertise
// //         delete submitData.assignedDistricts
// //       } else if (formData.role === "paralegal") {
// //         delete submitData.department
// //         delete submitData.designation
// //         delete submitData.assignedDistricts
// //       } else if (formData.role === "admin") {
// //         delete submitData.department
// //         delete submitData.designation
// //         delete submitData.areasOfExpertise
// //       }

// //       await register(submitData)
// //     } catch (err) {
// //       setError(err.message || "Registration failed.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const renderRoleSpecificFields = () => {
// //     switch (formData.role) {
// //       case "employee":
// //         return (
// //           <>
// //             <div className="flex gap-4">
// //               <div className="flex-1">
// //                 <label className="block text-sm font-medium text-slate-300 mb-1">Department *</label>
// //                 <div className="relative">
// //                   <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
// //                   <input
// //                     name="department"
// //                     placeholder="Legal Helpdesk"
// //                     value={formData.department}
// //                     onChange={handleChange}
// //                     required
// //                     className="input-style pl-10"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex-1">
// //                 <label className="block text-sm font-medium text-slate-300 mb-1">Designation *</label>
// //                 <div className="relative">
// //                   <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
// //                   <input
// //                     name="designation"
// //                     placeholder="Field Officer"
// //                     value={formData.designation}
// //                     onChange={handleChange}
// //                     required
// //                     className="input-style pl-10"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )

// //       case "paralegal":
// //         return (
// //           <>
// //             <div>
// //               <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number *</label>
// //               <div className="relative">
// //                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
// //                 <input
// //                   name="phoneNumber"
// //                   placeholder="9876543210"
// //                   value={formData.phoneNumber}
// //                   onChange={handleChange}
// //                   required
// //                   pattern="\d{10}"
// //                   title="Must be 10 digits"
// //                   className="input-style pl-10"
// //                 />
// //               </div>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-slate-300 mb-2">Areas of Expertise *</label>
// //               <div className="grid grid-cols-2 gap-2">
// //                 {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
// //                   <label key={area} className="flex items-center gap-2 text-slate-300">
// //                     <input
// //                       type="checkbox"
// //                       name="areasOfExpertise"
// //                       value={area}
// //                       checked={formData.areasOfExpertise.includes(area)}
// //                       onChange={handleChange}
// //                       className="rounded border-slate-600 bg-slate-700 text-cyan-600 focus:ring-cyan-500"
// //                     />
// //                     {area}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
// //           </>
// //         )

// //       case "admin":
// //         return (
// //           <>
// //             <div>
// //               <label className="block text-sm font-medium text-slate-300 mb-1">Assigned Districts</label>
// //               <div className="relative">
// //                 <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
// //                 <input
// //                   name="assignedDistricts"
// //                   placeholder="Mathura, Agra (comma-separated)"
// //                   value={formData.assignedDistricts.join(", ")}
// //                   onChange={handleChange}
// //                   className="input-style pl-10"
// //                 />
// //               </div>
// //               <p className="text-xs text-slate-400 mt-1">Enter district names separated by commas</p>
// //             </div>
// //           </>
// //         )

// //       default:
// //         return null
// //     }
// //   }

// //   const getRoleDescription = (role) => {
// //     switch (role) {
// //       case "citizen":
// //         return "Access legal help and manage your issues"
// //       case "employee":
// //         return "Help citizens with legal processes at kiosks"
// //       case "paralegal":
// //         return "Provide legal guidance and support"
// //       case "admin":
// //         return "Manage system and oversee operations"
// //       default:
// //         return ""
// //     }
// //   }

// //   if (isLoading) return <Spinner />
// //   if (isAuthenticated) return <Navigate to="/dashboard" replace />

// //   return (
// //     <div className="w-full max-w-5xl mx-auto flex rounded-xl shadow-2xl overflow-hidden bg-slate-800/80 backdrop-blur-sm border border-slate-700 my-8">
// //       {/* Image Side */}
// //       <div className="hidden lg:block lg:w-2/5">
// //         <img
// //           src="/login-background.png"
// //           alt="Community hands together, a sign of unity and support"
// //           className="w-full h-full object-cover"
// //         />
// //       </div>

// //       {/* Form Side */}
// //       <div className="w-full lg:w-3/5 p-8 flex flex-col justify-center">
// //         <div className="text-center mb-8">
// //           <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
// //           <p className="text-slate-400">Join NyayaSaathi to access legal help</p>
// //         </div>

// //         {error && (
// //           <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-6 text-center">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Role Selection */}
// //           <div>
// //             <label className="block text-sm font-medium text-slate-300 mb-3">Select Your Role *</label>
// //             <div className="grid grid-cols-2 gap-3">
// //               {[
// //                 { value: "citizen", label: "Citizen", icon: <User size={16} /> },
// //                 { value: "employee", label: "Employee", icon: <Users size={16} /> },
// //                 { value: "paralegal", label: "Paralegal", icon: <Award size={16} /> },
// //                 { value: "admin", label: "Admin", icon: <Building size={16} /> },
// //               ].map((role) => (
// //                 <label
// //                   key={role.value}
// //                   className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
// //                     formData.role === role.value
// //                       ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
// //                       : "border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500"
// //                   }`}
// //                 >
// //                   <input
// //                     type="radio"
// //                     name="role"
// //                     value={role.value}
// //                     checked={formData.role === role.value}
// //                     onChange={handleChange}
// //                     className="sr-only"
// //                   />
// //                   {role.icon}
// //                   <div>
// //                     <div className="font-medium">{role.label}</div>
// //                     <div className="text-xs opacity-75">{getRoleDescription(role.value)}</div>
// //                   </div>
// //                 </label>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Basic Information */}
// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-slate-300 mb-1">Full Name *</label>
// //               <div className="relative">
// //                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
// //                 <input
// //                   name="fullName"
// //                   placeholder="Enter your full name"
// //                   value={formData.fullName}
// //                   onChange={handleChange}
// //                   required
// //                   className="input-style pl-10"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex gap-4">
// //               <div className="flex-1">
// //                 <label className="block text-sm font-medium text-slate-300 mb-1">Email Address *</label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
// //                   <input
// //                     name="email"
// //                     type="email"
// //                     placeholder="your@email.com"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     required
// //                     className="input-style pl-10"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex-1">
// //                 <label className="block text-sm font-medium text-slate-300 mb-1">Password *</label>
// //                 <div className="relative">
// //                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
// //                   <input
// //                     name="password"
// //                     type="password"
// //                     placeholder="Min 6 characters"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     required
// //                     minLength={6}
// //                     className="input-style pl-10"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-slate-300 mb-1">Aadhaar Number *</label>
// //               <div className="relative">
// //                 <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
// //                 <input
// //                   name="aadhaarNumber"
// //                   placeholder="12-digit Aadhaar number"
// //                   value={formData.aadhaarNumber}
// //                   onChange={handleChange}
// //                   required
// //                   pattern="\d{12}"
// //                   title="Must be 12 digits"
// //                   className="input-style pl-10"
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Role-specific fields */}
// //           {renderRoleSpecificFields()}

// //           <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-3">
// //             {loading ? "Creating Account..." : "Create Account"}
// //           </button>
// //         </form>

// //         <p className="mt-6 text-center text-sm text-slate-400">
// //           Already have an account?{" "}
// //           <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
// //             Sign in
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// // export default RegisterPage
// "use client"

// import { useState } from "react"
// import { User, Mail, Lock, CreditCard, Users, Building, Phone, Award, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     aadhaarNumber: "",
//     role: "citizen",
//     phoneNumber: "",
//     department: "",
//     designation: "",
//     areasOfExpertise: [],
//     assignedDistricts: [],
//   })
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [validationErrors, setValidationErrors] = useState({})

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target

//     if (name === "areasOfExpertise") {
//       const currentAreas = formData.areasOfExpertise || []
//       if (checked) {
//         setFormData({ ...formData, areasOfExpertise: [...currentAreas, value] })
//       } else {
//         setFormData({ ...formData, areasOfExpertise: currentAreas.filter((area) => area !== value) })
//       }
//     } else if (name === "assignedDistricts") {
//       setFormData({ ...formData, assignedDistricts: value.split(",").map((d) => d.trim()) })
//     } else {
//       setFormData({ ...formData, [name]: value })
//     }

//     // Clear validation error when user starts typing
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: null }))
//     }
//   }

//   const validateForm = () => {
//     const errors = {}
    
//     if (!formData.fullName.trim()) errors.fullName = "Full name is required"
//     if (!formData.email.trim()) errors.email = "Email is required"
//     if (!formData.password || formData.password.length < 6) errors.password = "Password must be at least 6 characters"
//     if (!formData.aadhaarNumber || !/^\d{12}$/.test(formData.aadhaarNumber)) errors.aadhaarNumber = "Aadhaar must be 12 digits"
    
//     if (formData.role === "paralegal") {
//       if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = "Phone must be 10 digits"
//       if (!formData.areasOfExpertise.length) errors.areasOfExpertise = "Select at least one area"
//     }
    
//     if (formData.role === "employee") {
//       if (!formData.department.trim()) errors.department = "Department is required"
//       if (!formData.designation.trim()) errors.designation = "Designation is required"
//     }

//     setValidationErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)
    
//     if (!validateForm()) return
    
//     setLoading(true)

//     try {
//       const submitData = { ...formData }

//       if (formData.role === "citizen") {
//         delete submitData.department
//         delete submitData.designation
//         delete submitData.areasOfExpertise
//         delete submitData.assignedDistricts
//       } else if (formData.role === "employee") {
//         delete submitData.areasOfExpertise
//         delete submitData.assignedDistricts
//       } else if (formData.role === "paralegal") {
//         delete submitData.department
//         delete submitData.designation
//         delete submitData.assignedDistricts
//       } else if (formData.role === "admin") {
//         delete submitData.department
//         delete submitData.designation
//         delete submitData.areasOfExpertise
//       }

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000))
//       console.log("Registration successful:", submitData)
//     } catch (err) {
//       setError(err.message || "Registration failed.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderRoleSpecificFields = () => {
//     switch (formData.role) {
//       case "employee":
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">
//                   Department <span className="text-red-400">*</span>
//                 </label>
//                 <div className="relative group">
//                   <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
//                   <input
//                     name="department"
//                     placeholder="e.g., Legal Helpdesk"
//                     value={formData.department}
//                     onChange={handleChange}
//                     className={`w-full pl-11 pr-4 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
//                       validationErrors.department ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
//                     }`}
//                   />
//                   {validationErrors.department && (
//                     <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
//                       <AlertCircle size={14} />
//                       {validationErrors.department}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">
//                   Designation <span className="text-red-400">*</span>
//                 </label>
//                 <div className="relative group">
//                   <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
//                   <input
//                     name="designation"
//                     placeholder="e.g., Field Officer"
//                     value={formData.designation}
//                     onChange={handleChange}
//                     className={`w-full pl-11 pr-4 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
//                       validationErrors.designation ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
//                     }`}
//                   />
//                   {validationErrors.designation && (
//                     <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
//                       <AlertCircle size={14} />
//                       {validationErrors.designation}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case "paralegal":
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-200 mb-2">
//                 Phone Number <span className="text-red-400">*</span>
//               </label>
//               <div className="relative group">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
//                 <input
//                   name="phoneNumber"
//                   placeholder="9876543210"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className={`w-full pl-11 pr-4 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
//                     validationErrors.phoneNumber ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
//                   }`}
//                 />
//                 {validationErrors.phoneNumber && (
//                   <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
//                     <AlertCircle size={14} />
//                     {validationErrors.phoneNumber}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-200 mb-3">
//                 Areas of Expertise <span className="text-red-400">*</span>
//               </label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
//                   <label key={area} className="group cursor-pointer">
//                     <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
//                       formData.areasOfExpertise.includes(area)
//                         ? "border-blue-500 bg-blue-500/10 text-blue-300"
//                         : "border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50"
//                     }`}>
//                       <input
//                         type="checkbox"
//                         name="areasOfExpertise"
//                         value={area}
//                         checked={formData.areasOfExpertise.includes(area)}
//                         onChange={handleChange}
//                         className="sr-only"
//                       />
//                       <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
//                         formData.areasOfExpertise.includes(area)
//                           ? "border-blue-500 bg-blue-500"
//                           : "border-gray-500"
//                       }`}>
//                         {formData.areasOfExpertise.includes(area) && (
//                           <CheckCircle size={12} className="text-white" />
//                         )}
//                       </div>
//                       <span className="text-sm font-medium">{area}</span>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//               {validationErrors.areasOfExpertise && (
//                 <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
//                   <AlertCircle size={14} />
//                   {validationErrors.areasOfExpertise}
//                 </div>
//               )}
//             </div>
//           </div>
//         )

//       case "admin":
//         return (
//           <div>
//             <label className="block text-sm font-semibold text-gray-200 mb-2">Assigned Districts</label>
//             <div className="relative group">
//               <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
//               <input
//                 name="assignedDistricts"
//                 placeholder="Mathura, Agra (comma-separated)"
//                 value={formData.assignedDistricts.join(", ")}
//                 onChange={handleChange}
//                 className="w-full pl-11 pr-4 py-3.5 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//               />
//             </div>
//             <p className="text-xs text-gray-400 mt-2">Enter district names separated by commas</p>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   const getRoleDescription = (role) => {
//     switch (role) {
//       case "citizen":
//         return "Access legal help and manage your issues"
//       case "employee":
//         return "Help citizens with legal processes at kiosks"
//       case "paralegal":
//         return "Provide legal guidance and support"
//       case "admin":
//         return "Manage system and oversee operations"
//       default:
//         return ""
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
//       </div>
      
//       <div className="relative w-full max-w-6xl mx-auto">
//         <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
//           <div className="flex flex-col lg:flex-row">
//             {/* Image Side */}
//             <div className="hidden lg:block lg:w-2/5 relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
//               <img
//                 src="/api/placeholder/600/800"
//                 alt="Community hands together, a sign of unity and support"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
//               <div className="absolute bottom-8 left-8 right-8">
//                 <h3 className="text-2xl font-bold text-white mb-2">Join NyayaSaathi</h3>
//                 <p className="text-gray-200">Empowering communities through accessible legal support</p>
//               </div>
//             </div>

//             {/* Form Side */}
//             <div className="w-full lg:w-3/5 p-8 lg:p-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
//                   Create Account
//                 </h1>
//                 <p className="text-gray-400 text-lg">Join our community and get started today</p>
//               </div>

//               {error && (
//                 <div className="bg-red-500/10 border border-red-500/50 text-red-300 p-4 rounded-xl mb-6 flex items-center gap-2">
//                   <AlertCircle size={18} />
//                   {error}
//                 </div>
//               )}

//               <div onSubmit={handleSubmit} className="space-y-8">
//                 {/* Role Selection */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-200 mb-4">
//                     Select Your Role <span className="text-red-400">*</span>
//                   </label>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {[
//                       { value: "citizen", label: "Citizen", icon: <User size={20} /> },
//                       { value: "employee", label: "Employee", icon: <Users size={20} /> },
//                       { value: "paralegal", label: "Paralegal", icon: <Award size={20} /> },
//                       { value: "admin", label: "Admin", icon: <Building size={20} /> },
//                     ].map((role) => (
//                       <label
//                         key={role.value}
//                         className={`group cursor-pointer transition-all ${
//                           formData.role === role.value ? 'scale-105' : 'hover:scale-102'
//                         }`}
//                       >
//                         <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
//                           formData.role === role.value
//                             ? "border-blue-500 bg-blue-500/10 text-blue-300 shadow-lg shadow-blue-500/20"
//                             : "border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50"
//                         }`}>
//                           <input
//                             type="radio"
//                             name="role"
//                             value={role.value}
//                             checked={formData.role === role.value}
//                             onChange={handleChange}
//                             className="sr-only"
//                           />
//                           <div className={`p-2 rounded-lg ${
//                             formData.role === role.value ? 'bg-blue-500/20' : 'bg-gray-700/50'
//                           }`}>
//                             {role.icon}
//                           </div>
//                           <div>
//                             <div className="font-semibold">{role.label}</div>
//                             <div className="text-xs opacity-75">{getRoleDescription(role.value)}</div>
//                           </div>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Basic Information */}
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-200 mb-2">
//                       Full Name <span className="text-red-400">*</span>
//                     </label>
//                     <div className="relative group">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
//                       <input
//                         name="fullName"
//                         placeholder="Enter your full name"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         className={`w-full pl-11 pr-4 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
//                           validationErrors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
//                         }`}
//                       />
//                       {validationErrors.fullName && (
//                         <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
//                           <AlertCircle size={14} />
//                           {validationErrors.fullName}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-200 mb-2">
//                         Email Address <span className="text-red-400">*</span>
//                       </label>
//                       <div className="relative group">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
//                         <input
//                           name="email"
//                           type="email"
//                           placeholder="your@email.com"
//                           value={formData.email}
//                           onChange={handleChange}
//                           className={`w-full pl-11 pr-4 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
//                             validationErrors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
//                           }`}
//                         />
//                         {validationErrors.email && (
//                           <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
//                             <AlertCircle size={14} />
//                             {validationErrors.email}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-200 mb-2">
//                         Password <span className="text-red-400">*</span>
//                       </label>
//                       <div className="relative group">
//                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
//                         <input
//                           name="password"
//                           type={showPassword ? "text" : "password"}
//                           placeholder="Min 6 characters"
//                           value={formData.password}
//                           onChange={handleChange}
//                           className={`w-full pl-11 pr-12 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
//                             validationErrors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
//                           }`}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
//                         >
//                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                         </button>
//                         {validationErrors.password && (
//                           <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
//                             <AlertCircle size={14} />
//                             {validationErrors.password}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-200 mb-2">
//                       Aadhaar Number <span className="text-red-400">*</span>
//                     </label>
//                     <div className="relative group">
//                       <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
//                       <input
//                         name="aadhaarNumber"
//                         placeholder="12-digit Aadhaar number"
//                         value={formData.aadhaarNumber}
//                         onChange={handleChange}
//                         className={`w-full pl-11 pr-4 py-3.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
//                           validationErrors.aadhaarNumber ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
//                         }`}
//                       />
//                       {validationErrors.aadhaarNumber && (
//                         <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
//                           <AlertCircle size={14} />
//                           {validationErrors.aadhaarNumber}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Role-specific fields */}
//                 {renderRoleSpecificFields()}

//                 <button 
//                   type="submit" 
//                   disabled={loading} 
//                   className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg shadow-blue-500/25"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Creating Account...
//                     </div>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>
//               </div>

//               <div className="mt-8 text-center">
//                 <p className="text-gray-400">
//                   Already have an account?{" "}
//                   <button className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
//                     Sign in
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RegisterPage
"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { User, Mail, Lock, CreditCard, Users, Building, Phone, Award, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"

const RegisterPage = () => {
  const { register, isAuthenticated, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    aadhaarNumber: "",
    role: "citizen",
    phoneNumber: "",
    department: "",
    designation: "",
    areasOfExpertise: [],
    assignedDistricts: [],
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

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

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.fullName.trim()) errors.fullName = "Full name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    if (!formData.password || formData.password.length < 6) errors.password = "Password must be at least 6 characters"
    if (!formData.aadhaarNumber || !/^\d{12}$/.test(formData.aadhaarNumber)) errors.aadhaarNumber = "Aadhaar must be 12 digits"
    
    if (formData.role === "paralegal") {
      if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = "Phone must be 10 digits"
      if (!formData.areasOfExpertise.length) errors.areasOfExpertise = "Select at least one area"
    }
    
    if (formData.role === "employee") {
      if (!formData.department.trim()) errors.department = "Department is required"
      if (!formData.designation.trim()) errors.designation = "Designation is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    if (!validateForm()) return
    
    setLoading(true)

    try {
      const submitData = { ...formData }

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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input
                    name="department"
                    placeholder="e.g., Legal Helpdesk"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      validationErrors.department ? 'border-red-300 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:ring-cyan-100 focus:border-cyan-400'
                    }`}
                  />
                  {validationErrors.department && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle size={14} />
                      {validationErrors.department}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Designation <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input
                    name="designation"
                    placeholder="e.g., Field Officer"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      validationErrors.designation ? 'border-red-300 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:ring-cyan-100 focus:border-cyan-400'
                    }`}
                  />
                  {validationErrors.designation && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle size={14} />
                      {validationErrors.designation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case "paralegal":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                <input
                  name="phoneNumber"
                  placeholder="9876543210"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    validationErrors.phoneNumber ? 'border-red-300 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:ring-cyan-100 focus:border-cyan-400'
                  }`}
                />
                {validationErrors.phoneNumber && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} />
                    {validationErrors.phoneNumber}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Areas of Expertise <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Aadhaar", "Pension", "Land", "Certificates", "Fraud", "Court", "Welfare"].map((area) => (
                  <label key={area} className="group cursor-pointer">
                    <div className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      formData.areasOfExpertise.includes(area)
                        ? "border-cyan-400 bg-cyan-50 text-cyan-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}>
                      <input
                        type="checkbox"
                        name="areasOfExpertise"
                        value={area}
                        checked={formData.areasOfExpertise.includes(area)}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        formData.areasOfExpertise.includes(area)
                          ? "border-cyan-500 bg-cyan-500"
                          : "border-slate-300"
                      }`}>
                        {formData.areasOfExpertise.includes(area) && (
                          <CheckCircle size={12} className="text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{area}</span>
                    </div>
                  </label>
                ))}
              </div>
              {validationErrors.areasOfExpertise && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {validationErrors.areasOfExpertise}
                </div>
              )}
            </div>
          </div>
        )

      case "admin":
        return (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Assigned Districts</label>
            <div className="relative group">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
              <input
                name="assignedDistricts"
                placeholder="Mathura, Agra (comma-separated)"
                value={formData.assignedDistricts.join(", ")}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 transition-all"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Enter district names separated by commas</p>
          </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Side */}
            <div className="hidden lg:block lg:w-2/5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
              <img
                src="/login-background.png"
                alt="Community hands together, a sign of unity and support"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Join NyayaSaathi
                  </h3>
                  <p className="text-slate-600">Empowering communities through accessible legal support</p>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-3/5 p-8 lg:p-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-slate-800 mb-3 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-slate-600 text-lg">Join our community and get started today</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Select Your Role <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { value: "citizen", label: "Citizen", icon: <User size={20} />, bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100", iconColor: "text-blue-600" },
                      { value: "employee", label: "Employee", icon: <Users size={20} />, bgColor: "bg-gradient-to-br from-green-100 to-emerald-100", iconColor: "text-green-600" },
                      { value: "paralegal", label: "Paralegal", icon: <Award size={20} />, bgColor: "bg-gradient-to-br from-purple-100 to-pink-100", iconColor: "text-purple-600" },
                      { value: "admin", label: "Admin", icon: <Building size={20} />, bgColor: "bg-gradient-to-br from-orange-100 to-red-100", iconColor: "text-orange-600" },
                    ].map((role) => (
                      <label
                        key={role.value}
                        className={`group cursor-pointer transition-all duration-200 ${
                          formData.role === role.value ? 'scale-105' : 'hover:scale-102'
                        }`}
                      >
                        <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          formData.role === role.value
                            ? "border-cyan-400 bg-cyan-50 text-cyan-700 shadow-lg shadow-cyan-500/10"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}>
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={formData.role === role.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`w-12 h-12 rounded-xl ${role.bgColor} flex items-center justify-center shadow-sm ${
                            formData.role === role.value ? 'scale-110' : 'group-hover:scale-105'
                          } transition-transform duration-200`}>
                            <div className={role.iconColor}>
                              {role.icon}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">{role.label}</div>
                            <div className="text-xs opacity-75">{getRoleDescription(role.value)}</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                      <input
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          validationErrors.fullName ? 'border-red-300 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:ring-cyan-100 focus:border-cyan-400'
                        }`}
                      />
                      {validationErrors.fullName && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle size={14} />
                          {validationErrors.fullName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                        <input
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            validationErrors.email ? 'border-red-300 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:ring-cyan-100 focus:border-cyan-400'
                          }`}
                        />
                        {validationErrors.email && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                            <AlertCircle size={14} />
                            {validationErrors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min 6 characters"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-12 py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            validationErrors.password ? 'border-red-300 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:ring-cyan-100 focus:border-cyan-400'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-500 transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {validationErrors.password && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                            <AlertCircle size={14} />
                            {validationErrors.password}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Aadhaar Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                      <input
                        name="aadhaarNumber"
                        placeholder="12-digit Aadhaar number"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          validationErrors.aadhaarNumber ? 'border-red-300 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:ring-cyan-100 focus:border-cyan-400'
                        }`}
                      />
                      {validationErrors.aadhaarNumber && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle size={14} />
                          {validationErrors.aadhaarNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role-specific fields */}
                {renderRoleSpecificFields()}

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-lg shadow-cyan-500/25"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage