"use client"

import type React from "react"
import { useState } from "react"
import { BookOpen, ArrowLeft, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }

    if (!formData.password) {
      setError("Password is required")
      return false
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("🚀 Form submitted:", { isLogin, email: formData.email })

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")
    setDebugInfo(null)

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup"
      console.log("📡 Making request to:", endpoint)

      const requestBody = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      }

      console.log("📤 Request body:", { ...requestBody, password: "[HIDDEN]" })

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("📥 Response status:", response.status)
      console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()))

      const result = await response.json()
      console.log("📥 Response data:", result)

      setDebugInfo({
        endpoint,
        status: response.status,
        response: result,
        timestamp: new Date().toISOString(),
      })

      if (response.ok && result.success) {
        const userData = result.user || {
          name: formData.email.split("@")[0],
          email: formData.email,
        }

        console.log("✅ Authentication successful:", userData)

        // Store user data
        localStorage.setItem("user", JSON.stringify(userData))

        setSuccess(isLogin ? "Login successful! Redirecting..." : "Account created successfully! Redirecting...")

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/feedback")
        }, 1500)
      } else {
        console.log("❌ Authentication failed:", result)
        setError(result.error || `${isLogin ? "Login" : "Signup"} failed. Please try again.`)
      }
    } catch (error) {
      console.error("🔥 Network error:", error)
      setError("Network error. Please check your connection and try again.")
      setDebugInfo({
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError("")
    setSuccess("")
    setFormData({ email: "", password: "", confirmPassword: "" })
    setDebugInfo(null)
  }

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .auth-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 25%, #5b21b6 50%, #7c2d12 75%, #dc2626 100%);
          min-height: 100vh;
          position: relative;
        }
        
        .auth-card {
          background: white;
          border-radius: 25px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          max-width: 500px;
          width: 100%;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .auth-header {
          background: linear-gradient(45deg, #1e40af, #3b82f6);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        
        .form-control:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
        }
        
        .btn-auth {
          background: linear-gradient(45deg, #1e40af, #3b82f6);
          border: none;
          border-radius: 25px;
          padding: 15px 30px;
          font-weight: 600;
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);
        }
        
        .btn-auth:hover:not(:disabled) {
          background: linear-gradient(45deg, #1d4ed8, #2563eb);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(30, 64, 175, 0.4);
          color: white;
        }
        
        .btn-auth:disabled {
          opacity: 0.7;
          transform: none;
        }
        
        .alert-error {
          background-color: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          border-radius: 15px;
          padding: 15px;
        }
        
        .alert-success {
          background-color: #dcfce7;
          border: 1px solid #bbf7d0;
          color: #16a34a;
          border-radius: 15px;
          padding: 15px;
        }
        
        .debug-info {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 10px;
          font-size: 12px;
          font-family: monospace;
          max-height: 200px;
          overflow-y: auto;
        }
        
        .password-input-container {
          position: relative;
        }
        
        .password-toggle {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          z-index: 10;
        }
        
        .password-toggle:hover {
          color: #3b82f6;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          border-radius: 50px;
          padding: 12px 25px;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          font-weight: 600;
        }
        
        .back-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          color: white;
          text-decoration: none;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .toggle-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 25px;
          transition: all 0.3s ease;
          background: rgba(59, 130, 246, 0.1);
        }

        .toggle-link:hover {
          color: #1d4ed8;
          background: rgba(59, 130, 246, 0.2);
          text-decoration: none;
        }
      `}</style>

      <section className="auth-section d-flex align-items-center justify-content-center p-4">
        {/* Enhanced Back Button */}
        <Link href="/" className="position-absolute top-0 start-0 m-4 back-btn d-flex align-items-center">
          <ArrowLeft size={18} className="me-2" />
          Back to Home
        </Link>

        <div className="auth-card">
          {/* Updated Header */}
          <div className="auth-header">
            <BookOpen size={50} className="mb-3" />
            <h2 className="fw-bold mb-2">{isLogin ? "Welcome Back!" : "Join Us"}</h2>
            <p className="mb-0 opacity-90">
              {isLogin ? "Sign in to access the feedback form" : "Create account to start providing feedback"}
            </p>
          </div>

          {/* Form */}
          <div className="p-4">
            {error && (
              <div className="alert-error d-flex align-items-start mb-3">
                <AlertCircle size={20} className="me-2 mt-1 flex-shrink-0" />
                <div>{error}</div>
              </div>
            )}

            {success && (
              <div className="alert-success d-flex align-items-center mb-3">
                <CheckCircle size={20} className="me-2" />
                <div>{success}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password (min 6 characters)"
                    disabled={loading}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Signup only) */}
              {!isLogin && (
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm your password"
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-auth btn-lg w-100 mb-4 d-flex align-items-center justify-content-center"
                disabled={loading}
              >
                {loading && <div className="loading-spinner me-2"></div>}
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Enhanced Toggle Mode */}
            <div className="text-center">
              <button type="button" className="btn toggle-link" onClick={toggleMode} disabled={loading}>
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

            {/* Debug Information */}
            {/* {debugInfo && process.env.NODE_ENV === "development" && (
              <div className="mt-4">
                <h6 className="fw-bold">Debug Information:</h6>
                <div className="debug-info">
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </section>
    </div>
  )
}
