"use client"

import { useState } from "react"

const ServiceRequestList = ({ requests, onStatusUpdate, onRefresh }) => {
  const [filter, setFilter] = useState("ALL")
  const [sortBy, setSortBy] = useState("createdDate")
  const [sortOrder, setSortOrder] = useState("desc")

  const statusOptions = [
    { value: "ALL", label: "All Requests" },
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "CLOSED", label: "Closed" },
  ]

  const filteredRequests = requests.filter((request) => filter === "ALL" || request.status === filter)

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    if (sortBy === "createdDate") {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleStatusChange = (requestId, newStatus) => {
    onStatusUpdate(requestId, newStatus)
  }

  const getStatusColor = (status) => {
    const colors = {
      OPEN: "#e74c3c",
      IN_PROGRESS: "#f39c12",
      RESOLVED: "#27ae60",
      CLOSED: "#95a5a6",
    }
    return colors[status] || "#95a5a6"
  }

  const getPriorityColor = (priority) => {
    const colors = {
      HIGH: "#e74c3c",
      MEDIUM: "#f39c12",
      LOW: "#27ae60",
    }
    return colors[priority] || "#95a5a6"
  }

  return (
    <div className="request-list-container">
      <div className="list-header">
        <h2>Service Requests ({sortedRequests.length})</h2>
        <button onClick={onRefresh} className="refresh-button">
          Refresh
        </button>
      </div>

      <div className="list-controls">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdDate">Created Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="title">Title</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="request-list">
        {sortedRequests.map((request) => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <h3 className="request-title">{request.title}</h3>
              <div className="request-meta">
                <span className="priority-badge" style={{ backgroundColor: getPriorityColor(request.priority) }}>
                  {request.priority}
                </span>
                <span className="category-badge">{request.category}</span>
              </div>
            </div>

            <div className="request-body">
              <p className="request-description">{request.description}</p>

              <div className="request-details">
                <div className="detail-item">
                  <strong>Requester:</strong> {request.requesterName}
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> {request.requesterEmail}
                </div>
                {request.department && (
                  <div className="detail-item">
                    <strong>Department:</strong> {request.department}
                  </div>
                )}
                <div className="detail-item">
                  <strong>Created:</strong> {new Date(request.createdDate).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="request-footer">
              <div className="status-section">
                <span className="status-badge" style={{ backgroundColor: getStatusColor(request.status) }}>
                  {request.status.replace("_", " ")}
                </span>
              </div>

              <div className="action-section">
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(request.id, e.target.value)}
                  className="status-select"
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedRequests.length === 0 && (
        <div className="empty-state">
          <p>No service requests found.</p>
        </div>
      )}
    </div>
  )
}

export default ServiceRequestList
