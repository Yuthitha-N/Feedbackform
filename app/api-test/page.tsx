"use client"

import { useState } from "react"
import Link from "next/link"

export default function ApiTestPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState<string>("")

  const testApi = async (endpoint: string, method = "GET", body?: any) => {
    setLoading(endpoint)
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      }

      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(endpoint, options)
      const data = await response.json()

      setResults((prev) => ({
        ...prev,
        [endpoint]: {
          status: response.status,
          data,
          timestamp: new Date().toISOString(),
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [endpoint]: {
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString(),
        },
      }))
    } finally {
      setLoading("")
    }
  }

  return (
    <div className="container py-5">
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
      `}</style>

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>API Test Page</h1>
            <Link href="/" className="btn btn-outline-primary">
              Back to Home
            </Link>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <button
                className="btn btn-primary w-100"
                onClick={() => testApi("/api/auth/signup")}
                disabled={loading === "/api/auth/signup"}
              >
                {loading === "/api/auth/signup" ? "Testing..." : "Test Signup API (GET)"}
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-primary w-100"
                onClick={() => testApi("/api/auth/login")}
                disabled={loading === "/api/auth/login"}
              >
                {loading === "/api/auth/login" ? "Testing..." : "Test Login API (GET)"}
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-success w-100"
                onClick={() =>
                  testApi("/api/auth/signup", "POST", {
                    email: "test@example.com",
                    password: "password123",
                  })
                }
                disabled={loading === "/api/auth/signup-POST"}
              >
                {loading === "/api/auth/signup-POST" ? "Testing..." : "Test Signup (POST)"}
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-success w-100"
                onClick={() =>
                  testApi("/api/auth/login", "POST", {
                    email: "test@example.com",
                    password: "password123",
                  })
                }
                disabled={loading === "/api/auth/login-POST"}
              >
                {loading === "/api/auth/login-POST" ? "Testing..." : "Test Login (POST)"}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h3>Results:</h3>
              <pre className="bg-light p-3 rounded" style={{ maxHeight: "500px", overflow: "auto" }}>
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
