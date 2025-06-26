"use client"
import { useState, useEffect } from "react"
import { BookOpen, Users, Star, TrendingUp, LogOut, Shield, Award, BarChart3, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <div className="min-h-screen">
      {/* Updated CSS Styling with better visibility */}
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 25%, #5b21b6 50%, #7c2d12 75%, #dc2626 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .hero-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.05;
          background-image: 
            radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px);
          background-size: 60px 60px, 40px 40px;
        }
        
        .navbar-professional {
          background: rgba(255, 255, 255, 0.98) !important;
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .feature-card {
          transition: all 0.4s ease;
          border: none;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .feature-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        .btn-get-started {
          background: linear-gradient(45deg, #dc2626, #ea580c);
          border: none;
          border-radius: 50px;
          padding: 18px 45px;
          font-weight: 700;
          font-size: 18px;
          color: white;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
        }
        
        .btn-get-started:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.4);
          color: white;
        }
        
        .btn-feedback {
          background: linear-gradient(45deg, #059669, #0d9488);
          border: none;
          border-radius: 50px;
          padding: 15px 35px;
          font-weight: 600;
          font-size: 16px;
          color: white;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
        }
        
        .btn-feedback:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(5, 150, 105, 0.4);
          color: white;
        }
        
        .stats-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 25px;
          text-align: center;
          color: white;
          transition: all 0.3s ease;
        }
        
        .stats-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
        }
        
        .hero-image {
          max-height: 550px;
          width: 100%;
          object-fit: cover;
          border-radius: 25px !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          transition: all 0.4s ease;
          border: 4px solid rgba(255,255,255,0.2);
        }

        .hero-image:hover {
          transform: scale(1.03) rotate(0.5deg);
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }

        .image-container {
          position: relative;
          display: inline-block;
          width: 100%;
          perspective: 1000px;
        }

        .floating-elements {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .floating-icon {
          position: absolute;
          background: rgba(255,255,255,0.95);
          border-radius: 50%;
          padding: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          animation: float 4s ease-in-out infinite;
        }

        .floating-icon:nth-child(1) {
          top: -40px;
          left: -40px;
          animation-delay: 0s;
        }

        .floating-icon:nth-child(2) {
          top: -30px;
          right: -50px;
          animation-delay: 1.5s;
        }

        .floating-icon:nth-child(3) {
          bottom: -35px;
          left: -45px;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        .user-info {
          background: linear-gradient(45deg, #1e40af, #3b82f6);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          padding: 10px 25px;
          color: white;
          box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);
        }

        .section-title {
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          color: #6b7280;
          font-size: 1.2rem;
          font-weight: 400;
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          color: white;
        }

        .testimonial-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .testimonial-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .cta-section {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        }

        .logout-btn {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          border-radius: 25px;
          padding: 8px 20px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .logout-btn:hover {
          background: linear-gradient(45deg, #b91c1c, #dc2626);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
          color: white;
        }
      `}</style>

      {/* Updated Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light navbar-professional fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <div
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                width: "45px",
                height: "45px",
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                borderRadius: "12px",
              }}
            >
              <BookOpen size={24} color="white" />
            </div>
            <div>
              <span className="fw-bold fs-4" style={{ color: "#1f2937" }}>
                Course Instructor Feedback Form
              </span>
              <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>Educational Feedback System</div>
            </div>
          </a>
          <div className="d-flex gap-3 align-items-center">
            {user && (
              <div className="d-flex align-items-center gap-3">
                <div className="user-info d-flex align-items-center gap-2">
                  <div
                    className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px", fontSize: "16px", fontWeight: "bold" }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="fw-semibold" style={{ fontSize: "14px" }}>
                      Welcome, {user.name}
                    </div>
                    <div style={{ fontSize: "12px", opacity: "0.9" }}>{user.email}</div>
                  </div>
                </div>
                <button className="btn logout-btn btn-sm d-flex align-items-center gap-2" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Updated Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="hero-overlay"></div>
        <div className="hero-bg-pattern"></div>
        <div className="container hero-content">
          <div className="row align-items-center min-vh-100 py-5">
            {/* Left Content */}
            <div className="col-lg-6 text-white">
              <div className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <Shield size={24} className="me-2" />
                  <span className="badge bg-light text-dark px-3 py-2 rounded-pill fw-semibold">
                    Trusted by 500+ Students
                  </span>
                </div>
                <h1 className="display-2 fw-bold mb-4 lh-1">
                  Course Instructor
                  <span className="d-block" style={{ color: "#fbbf24" }}>
                    Feedback Form
                  </span>
                </h1>
                <p className="fs-4 mb-4 opacity-90 fw-light">
                  Share your honest feedback to help improve teaching quality
                </p>
                <p className="fs-6 mb-5 opacity-75 lh-lg">
                  Your valuable feedback helps instructors understand what works well and what can be improved. This
                  anonymous feedback system ensures your honest opinions contribute to better educational experiences
                  for everyone.
                </p>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-4 mb-5">
                {user ? (
                  <Link href="/feedback" className="text-decoration-none">
                    <button className="btn btn-feedback d-flex align-items-center gap-2">
                      <BarChart3 size={20} />
                      Start Feedback
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth" className="text-decoration-none">
                    <button className="btn btn-get-started d-flex align-items-center gap-2">
                      <CheckCircle size={20} />
                      Get Started Now
                    </button>
                  </Link>
                )}
              </div>

              {/* Updated Stats */}
              <div className="row g-4">
                <div className="col-4">
                  <div className="stats-card">
                    <div className="fs-1 fw-bold">500+</div>
                    <div className="small fw-semibold">Students</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stats-card">
                    <div className="fs-1 fw-bold">50+</div>
                    <div className="small fw-semibold">Instructors</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stats-card">
                    <div className="fs-1 fw-bold">98%</div>
                    <div className="small fw-semibold">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <div className="position-relative">
                <div className="image-container">
                  <img
                    src="/images/digital-feedback.jpeg"
                    alt="Course instructor feedback form interface"
                    className="hero-image img-fluid"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder.jpg-wVQAp9c0gsesndemw3y9DwgMlmiQyf.jpeg"
                    }}
                  />

                  {/* Updated Floating Elements */}
                  <div className="floating-elements">
                    <div className="floating-icon">
                      <Award size={24} color="#3b82f6" />
                    </div>
                    <div className="floating-icon">
                      <BarChart3 size={22} color="#8b5cf6" />
                    </div>
                    <div className="floating-icon">
                      <Star size={20} color="#059669" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title display-4 fw-bold">Why Your Feedback Matters</h2>
            <p className="section-subtitle">Help us create better learning experiences</p>
          </div>

          <div className="row g-5">
            <div className="col-lg-4">
              <div className="card feature-card h-100 text-center p-4">
                <div className="card-body">
                  <div className="feature-icon">
                    <Users size={32} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Improve Teaching Methods</h5>
                  <p className="card-text text-muted lh-lg">
                    Your feedback helps instructors understand which teaching methods work best and identify areas where
                    they can enhance their approach to better serve students.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card feature-card h-100 text-center p-4">
                <div className="card-body">
                  <div className="feature-icon">
                    <Star size={32} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Enhance Course Quality</h5>
                  <p className="card-text text-muted lh-lg">
                    Student feedback directly contributes to improving course content, structure, and delivery methods,
                    ensuring better learning outcomes for future students.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card feature-card h-100 text-center p-4">
                <div className="card-body">
                  <div className="feature-icon">
                    <TrendingUp size={32} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Student Success</h5>
                  <p className="card-text text-muted lh-lg">
                    Your honest opinions help create a better educational environment, leading to improved learning
                    experiences and higher student satisfaction rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Call to Action Section */}
      <section className="cta-section py-5 text-white">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">Ready to Share Your Feedback?</h2>
              <p className="fs-5 mb-5 opacity-90">
                Your honest feedback helps improve teaching quality and creates better learning experiences for all
                students. Join hundreds of students who have already shared their valuable insights.
              </p>
              {!user && (
                <Link href="/auth" className="text-decoration-none">
                  <button className="btn btn-get-started btn-lg">Start Your Feedback Today</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" async></script>
    </div>
  )
}
