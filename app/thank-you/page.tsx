"use client"
import { CheckCircle, Home, FileText, Star } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div
      className="min-h-screen d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      {/* Bootstrap CSS */}
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        
        .thank-you-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #28a745, #20c997);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        
        .feature-box {
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .feature-box:hover {
          border-color: #667eea;
          transform: translateY(-5px);
        }
        
        .btn-custom {
          border-radius: 25px;
          padding: 12px 25px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .btn-primary-custom {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
        }
        
        .btn-primary-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .process-list {
          background: #e8f5e8;
          border: 1px solid #c3e6c3;
          border-radius: 15px;
          padding: 25px;
        }
        
        .process-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        
        .process-item:last-child {
          margin-bottom: 0;
        }
        
        .process-bullet {
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
          margin-right: 15px;
          margin-top: 8px;
          flex-shrink: 0;
        }
      `}</style>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="thank-you-card p-5">
              {/* Success Icon */}
              <div className="success-icon">
                <CheckCircle size={40} color="white" />
              </div>

              {/* Header */}
              <div className="text-center mb-4">
                <h1 className="display-4 fw-bold text-success mb-3">Thank You!</h1>
                <p className="fs-5 text-muted">Your feedback has been submitted successfully</p>
              </div>

              {/* Success Message */}
              <div className="alert alert-success border-0 rounded-4 mb-4">
                <h5 className="alert-heading fw-bold mb-2">
                  <CheckCircle size={20} className="me-2" />
                  Feedback Received
                </h5>
                <p className="mb-0">
                  Your valuable feedback helps us improve our teaching methods and course content. We appreciate your
                  honest opinions and the time you took to complete this survey.
                </p>
              </div>

              {/* Feature Boxes */}
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="feature-box">
                    <FileText size={32} className="text-primary mb-2" />
                    <h6 className="fw-bold mb-1">Feedback Recorded</h6>
                    <small className="text-muted">Your responses have been saved</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature-box">
                    <Star size={32} className="text-warning mb-2" />
                    <h6 className="fw-bold mb-1">Ratings Captured</h6>
                    <small className="text-muted">Your ratings will help improve quality</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature-box">
                    <CheckCircle size={32} className="text-success mb-2" />
                    <h6 className="fw-bold mb-1">Process Complete</h6>
                    <small className="text-muted">Thank you for your participation</small>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">What happens next?</h5>
                <div className="process-list">
                  <div className="process-item">
                    <div className="process-bullet"></div>
                    <div>Your feedback will be reviewed by our academic team</div>
                  </div>
                  <div className="process-item">
                    <div className="process-bullet"></div>
                    <div>Instructors will receive constructive feedback to improve their teaching</div>
                  </div>
                  <div className="process-item">
                    <div className="process-bullet"></div>
                    <div>Course content and delivery methods will be enhanced based on your input</div>
                  </div>
                  <div className="process-item">
                    <div className="process-bullet"></div>
                    <div>Your responses remain confidential and anonymous</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="row g-3">
                <div className="col-sm-6">
                  <Link href="/" className="text-decoration-none">
                    <button className="btn btn-primary-custom btn-custom w-100">
                      <Home size={18} className="me-2" />
                      Back to Home
                    </button>
                  </Link>
                </div>
                <div className="col-sm-6">
                  <Link href="/feedback" className="text-decoration-none">
                    <button className="btn btn-outline-primary btn-custom w-100">
                      <FileText size={18} className="me-2" />
                      Submit Another Feedback
                    </button>
                  </Link>
                </div>
              </div>

              {/* Footer Note */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  If you have any questions or concerns, please contact our support team.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
