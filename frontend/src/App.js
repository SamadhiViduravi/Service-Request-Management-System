"use client"

import { useState, useEffect } from "react"
import ServiceRequestForm from "./components/ServiceRequestForm"
import ServiceRequestList from "./components/ServiceRequestList"
import Dashboard from "./components/Dashboard"
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)

  const API_BASE_URL = "http://localhost:8080/api"

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/service-requests`)
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error("Error fetching requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestSubmit = async (requestData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/service-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        fetchRequests()
        setActiveTab("requests")
      }
    } catch (error) {
      console.error("Error submitting request:", error)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/service-requests/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchRequests()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Service Request Management System</h1>
        <nav className="nav-tabs">
          <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </button>
          <button className={activeTab === "create" ? "active" : ""} onClick={() => setActiveTab("create")}>
            Create Request
          </button>
          <button className={activeTab === "requests" ? "active" : ""} onClick={() => setActiveTab("requests")}>
            All Requests
          </button>
        </nav>
      </header>

      <main className="app-main">
        {loading && <div className="loading">Loading...</div>}

        {activeTab === "dashboard" && <Dashboard requests={requests} />}

        {activeTab === "create" && <ServiceRequestForm onSubmit={handleRequestSubmit} />}

        {activeTab === "requests" && (
          <ServiceRequestList requests={requests} onStatusUpdate={handleStatusUpdate} onRefresh={fetchRequests} />
        )}
      </main>
    </div>
  )
}

export default App
