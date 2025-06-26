"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MapPin, GraduationCap, Star, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface StudentInfo {
  name: string
  rollNo: string
  phoneNo: string
  course: string
  instructorName: string
  location: string
  collegeName: string
}

interface FeedbackSection {
  title: string
  questions: string[]
}

const courses = [
  "Python",
  "Operating System",
  "Database Management System",
  "Design And Analysis of Algorithm",
  "Web Technology",
]

const feedbackSections: FeedbackSection[] = [
  {
    title: "Teaching Skills",
    questions: [
      "The instructor explains concepts clearly",
      "The instructor uses effective teaching methods",
      "The instructor encourages student participation",
      "The instructor provides helpful examples",
      "The instructor is well-prepared for classes",
    ],
  },
  {
    title: "Course Understanding",
    questions: [
      "The course objectives were clearly defined",
      "The course content was well organized",
      "The assignments helped reinforce learning",
      "The course difficulty was appropriate",
      "The course materials were helpful",
    ],
  },
  {
    title: "Communication & Support",
    questions: [
      "The instructor was available for help",
      "The instructor responded to questions promptly",
      "The instructor provided constructive feedback",
      "The instructor created a positive learning environment",
      "The instructor encouraged questions and discussions",
    ],
  },
]

const likertOptions = ["NEVER", "RARELY", "SOMETIMES", "OFTEN", "ALWAYS"]

export default function FeedbackPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: "",
    rollNo: "",
    phoneNo: "",
    course: "",
    instructorName: "",
    location: "",
    collegeName: "",
  })
  const [feedback, setFeedback] = useState<Record<string, string>>({})
  const [instructorRating, setInstructorRating] = useState(0)
  const [courseRating, setCourseRating] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [locations, setLocations] = useState<string[]>([])
  const [colleges, setColleges] = useState<string[]>([])
  const [loadingLocations, setLoadingLocations] = useState(false)
  const [loadingColleges, setLoadingColleges] = useState(false)

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
        // Pre-fill student name from user data
        setStudentInfo((prev) => ({ ...prev, name: userData.name }))
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Fetch locations from API
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchLocations = async () => {
      setLoadingLocations(true)
      try {
        const indianCities = [
          " Maharashtra",
          " Delhi",
          " Karnataka",
          " Tamil Nadu",
          " West Bengal",
          "Telangana",
         
          "Gujarat",
          "Rajasthan",
         
          "Uttar Pradesh",
         
          "Madhya Pradesh",
        ,
         
          "Bihar",
          "Gujarat",
         
        ]
        setLocations(indianCities)
      } catch (error) {
        console.error("Error fetching locations:", error)
        setLocations([
          " Maharashtra",
          "Delhi",
          " Karnataka",
          "Tamil Nadu",
          " West Bengal",
        ])
      } finally {
        setLoadingLocations(false)
      }
    }

    fetchLocations()
  }, [isAuthenticated])

  // Fetch colleges from API
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchColleges = async () => {
      setLoadingColleges(true)
      try {
        const indianColleges = [
          "Kongu Engineering College (KEC)",
      
          "Indian Institute of Technology (IIT) Delhi",
          "Indian Institute of Technology (IIT) Bombay",
          "Indian Institute of Technology (IIT) Madras",
          "Indian Institute of Technology (IIT) Kanpur",
          "Indian Institute of Technology (IIT) Kharagpur",
          "Indian Institute of Science (IISc) Bangalore",
          "Jawaharlal Nehru University (JNU)",
          "University of Delhi",
          "Banaras Hindu University (BHU)",
          "Jamia Millia Islamia",
          "Aligarh Muslim University (AMU)",
          "Jadavpur University",
          "Anna University",
          "Osmania University",
          "Pune University",
          "Mumbai University",
          "Calcutta University",
          "Madras University",
          "Hyderabad University",
          "Manipal Academy of Higher Education",
        ]
        setColleges(indianColleges)
      } catch (error) {
        console.error("Error fetching colleges:", error)
        setColleges(["Indian Institute of Technology (IIT) Delhi", "University of Delhi"])
      } finally {
        setLoadingColleges(false)
      }
    }

    fetchColleges()
  }, [isAuthenticated])

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show authentication required screen if not logged in
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen d-flex align-items-center justify-content-center"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <style jsx global>{`
          @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        `}</style>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-lg border-0" style={{ borderRadius: "20px" }}>
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle p-3 mb-3">
                      <Lock size={40} className="text-danger" />
                    </div>
                    <h2 className="fw-bold text-dark mb-3">Authentication Required</h2>
                    <p className="text-muted mb-4">
                      You need to be logged in to access the feedback system. Please authenticate to continue.
                    </p>
                  </div>

                  <div className="alert alert-warning d-flex align-items-center mb-4" role="alert">
                    <AlertCircle size={20} className="me-2" />
                    <div>
                      <strong>Access Restricted:</strong> Only authenticated users can submit feedback.
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <Link href="/auth" className="btn btn-primary btn-lg" style={{ borderRadius: "25px" }}>
                      Login / Sign Up
                    </Link>
                    <Link href="/" className="btn btn-outline-secondary">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleStudentInfoChange = (field: keyof StudentInfo, value: string) => {
    setStudentInfo((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFeedbackChange = (questionIndex: string, value: string) => {
    setFeedback((prev) => ({ ...prev, [questionIndex]: value }))
  }

  const validateStudentInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!studentInfo.name.trim()) newErrors.name = "Name is required"
    if (!studentInfo.rollNo.trim()) newErrors.rollNo = "Roll number is required"
    if (!studentInfo.phoneNo.trim()) newErrors.phoneNo = "Phone number is required"
    if (!studentInfo.course) newErrors.course = "Course selection is required"
    if (!studentInfo.instructorName.trim()) newErrors.instructorName = "Instructor name is required"
    if (!studentInfo.location) newErrors.location = "Location selection is required"
    if (!studentInfo.collegeName) newErrors.collegeName = "College selection is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateFeedback = () => {
    const totalQuestions = feedbackSections.reduce((acc, section) => acc + section.questions.length, 0)
    const answeredQuestions = Object.keys(feedback).length
    return answeredQuestions === totalQuestions
  }

  const validateRatings = () => {
    return instructorRating > 0 && courseRating > 0
  }

  const handleNext = () => {
    if (step === 1) {
      if (validateStudentInfo()) {
        setStep(2)
      }
    } else if (step === 2) {
      if (validateFeedback()) {
        setStep(3)
      } else {
        alert("Please answer all questions before proceeding.")
      }
    }
  }

  const handleSubmit = async () => {
    if (!validateRatings()) {
      alert("Please provide ratings for both instructor and course before submitting.")
      return
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentInfo,
          feedback,
          instructorRating,
          courseRating,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        router.push("/thank-you")
      } else {
        alert("Error submitting feedback. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error submitting feedback. Please try again.")
    }
  }

  const StarRating = ({
    rating,
    setRating,
    label,
  }: { rating: number; setRating: (rating: number) => void; label: string }) => {
    return (
      <div className="space-y-2">
        <Label className="text-lg font-medium">{label}</Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`p-1 transition-colors ${
                star <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
              }`}
            >
              <Star className="h-8 w-8 fill-current" />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {rating === 0 && "Click to rate"}
          {rating === 1 && "Poor"}
          {rating === 2 && "Fair"}
          {rating === 3 && "Good"}
          {rating === 4 && "Very Good"}
          {rating === 5 && "Excellent"}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bootstrap CSS */}
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        
        .feedback-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        
        .feedback-table th,
        .feedback-table td {
          padding: 15px 10px;
          text-align: center;
          border-bottom: 1px solid #dee2e6;
        }
        
        .feedback-table th:first-child,
        .feedback-table td:first-child {
          text-align: left;
          padding-left: 20px;
        }
        
        .feedback-table tbody tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        
        .feedback-table tbody tr:hover {
          background-color: #e9ecef;
        }
        
        .radio-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        
        .section-title {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 0;
        }
        
        .progress-step {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        
        .progress-step.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
        }
        
        .progress-step.inactive {
          background: #e9ecef;
          color: #6c757d;
        }
        
        .progress-line {
          height: 4px;
          background: #e9ecef;
          flex: 1;
          margin: 0 10px;
          border-radius: 2px;
        }
        
        .progress-line.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
        }

        .user-welcome {
          background: linear-gradient(45deg, #059669, #0d9488);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white shadow-sm border-bottom">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <Link href="/" className="d-flex align-items-center text-decoration-none text-primary">
              <ArrowLeft className="me-2" size={20} />
              Back to Home
            </Link>

            {user && (
              <div className="user-welcome d-flex align-items-center gap-2">
                <div
                  className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "30px", height: "30px", fontSize: "12px", fontWeight: "bold" }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>Welcome, {user.name}</span>
              </div>
            )}

            <div className="d-flex align-items-center">
              <div className={`progress-step ${step >= 1 ? "active" : "inactive"}`}>1</div>
              <div className={`progress-line ${step >= 2 ? "active" : ""}`}></div>
              <div className={`progress-step ${step >= 2 ? "active" : "inactive"}`}>2</div>
              <div className={`progress-line ${step >= 3 ? "active" : ""}`}></div>
              <div className={`progress-step ${step >= 3 ? "active" : "inactive"}`}>3</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center h2 mb-0">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="row g-4">
                <div className="col-md-6">
                  <Label htmlFor="name">Student Name *</Label>
                  <Input
                    id="name"
                    value={studentInfo.name}
                    onChange={(e) => handleStudentInfoChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? "border-danger" : ""}
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                <div className="col-md-6">
                  <Label htmlFor="rollNo">Student Roll Number *</Label>
                  <Input
                    id="rollNo"
                    value={studentInfo.rollNo}
                    onChange={(e) => handleStudentInfoChange("rollNo", e.target.value)}
                    placeholder="Enter your roll number"
                    className={errors.rollNo ? "border-danger" : ""}
                  />
                  {errors.rollNo && <small className="text-danger">{errors.rollNo}</small>}
                </div>

                <div className="col-md-6">
                  <Label htmlFor="phoneNo">Phone Number *</Label>
                  <Input
                    id="phoneNo"
                    value={studentInfo.phoneNo}
                    onChange={(e) => handleStudentInfoChange("phoneNo", e.target.value)}
                    placeholder="Enter your phone number"
                    className={errors.phoneNo ? "border-danger" : ""}
                  />
                  {errors.phoneNo && <small className="text-danger">{errors.phoneNo}</small>}
                </div>

                <div className="col-md-6">
                  <Label htmlFor="course">Course Name *</Label>
                  <Select
                    value={studentInfo.course}
                    onValueChange={(value) => handleStudentInfoChange("course", value)}
                  >
                    <SelectTrigger className={errors.course ? "border-danger" : ""}>
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.course && <small className="text-danger">{errors.course}</small>}
                </div>

                <div className="col-md-6">
                  <Label htmlFor="instructorName">Instructor Name *</Label>
                  <Input
                    id="instructorName"
                    value={studentInfo.instructorName}
                    onChange={(e) => handleStudentInfoChange("instructorName", e.target.value)}
                    placeholder="Enter instructor's name"
                    className={errors.instructorName ? "border-danger" : ""}
                  />
                  {errors.instructorName && <small className="text-danger">{errors.instructorName}</small>}
                </div>

                <div className="col-md-6">
                  <Label htmlFor="location">
                    <MapPin className="me-1" size={16} />
                    Student Location *
                  </Label>
                  <Select
                    value={studentInfo.location}
                    onValueChange={(value) => handleStudentInfoChange("location", value)}
                  >
                    <SelectTrigger className={errors.location ? "border-danger" : ""}>
                      <SelectValue placeholder={loadingLocations ? "Loading locations..." : "Select your location"} />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && <small className="text-danger">{errors.location}</small>}
                </div>

                <div className="col-12">
                  <Label htmlFor="collegeName">
                    <GraduationCap className="me-1" size={16} />
                    College Name *
                  </Label>
                  <Select
                    value={studentInfo.collegeName}
                    onValueChange={(value) => handleStudentInfoChange("collegeName", value)}
                  >
                    <SelectTrigger className={errors.collegeName ? "border-danger" : ""}>
                      <SelectValue placeholder={loadingColleges ? "Loading colleges..." : "Select your college"} />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem key={college} value={college}>
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.collegeName && <small className="text-danger">{errors.collegeName}</small>}
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <Button onClick={handleNext} className="btn btn-primary px-4">
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center h2 mb-0">Course Instructor Feedback</CardTitle>
                <p className="text-center text-muted mt-2">Please rate each statement based on your experience</p>
              </CardHeader>
            </Card>

            {feedbackSections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader>
                  <CardTitle className="section-title h4">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="table-responsive">
                    <table className="feedback-table">
                      <thead>
                        <tr>
                          <th style={{ width: "40%" }}>Statement</th>
                          {likertOptions.map((option) => (
                            <th key={option} style={{ width: "12%" }}>
                              {option}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.questions.map((question, questionIndex) => {
                          const questionKey = `${sectionIndex}-${questionIndex}`
                          return (
                            <tr key={questionIndex}>
                              <td className="fw-medium">{question}</td>
                              {likertOptions.map((option) => (
                                <td key={option}>
                                  <input
                                    type="radio"
                                    name={questionKey}
                                    value={option}
                                    onChange={(e) => handleFeedbackChange(questionKey, e.target.value)}
                                    className="radio-input"
                                  />
                                </td>
                              ))}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="d-flex justify-content-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleNext} className="btn btn-primary">
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center h2 mb-0">Overall Ratings</CardTitle>
              <p className="text-center text-muted mt-2">Please provide your overall ratings</p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="row g-5">
                <div className="col-md-6 text-center">
                  <StarRating
                    rating={instructorRating}
                    setRating={setInstructorRating}
                    label={`Rate ${studentInfo.instructorName || "Instructor"}`}
                  />
                </div>
                <div className="col-md-6 text-center">
                  <StarRating
                    rating={courseRating}
                    setRating={setCourseRating}
                    label={`Rate ${studentInfo.course || "Course"}`}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-5">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} className="btn btn-success px-4">
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
