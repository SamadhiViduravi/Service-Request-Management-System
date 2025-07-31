const Dashboard = ({ requests }) => {
  const getStatusCounts = () => {
    const counts = {
      OPEN: 0,
      IN_PROGRESS: 0,
      RESOLVED: 0,
      CLOSED: 0,
    }

    requests.forEach((request) => {
      counts[request.status] = (counts[request.status] || 0) + 1
    })

    return counts
  }

  const getPriorityDistribution = () => {
    const priorities = { HIGH: 0, MEDIUM: 0, LOW: 0 }
    requests.forEach((request) => {
      priorities[request.priority] = (priorities[request.priority] || 0) + 1
    })
    return priorities
  }

  const getRecentRequests = () => {
    return requests.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0, 5)
  }

  const statusCounts = getStatusCounts()
  const priorityDistribution = getPriorityDistribution()
  const recentRequests = getRecentRequests()

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Request Status Overview</h3>
          <div className="status-grid">
            <div className="status-item open">
              <span className="count">{statusCounts.OPEN}</span>
              <span className="label">Open</span>
            </div>
            <div className="status-item progress">
              <span className="count">{statusCounts.IN_PROGRESS}</span>
              <span className="label">In Progress</span>
            </div>
            <div className="status-item resolved">
              <span className="count">{statusCounts.RESOLVED}</span>
              <span className="label">Resolved</span>
            </div>
            <div className="status-item closed">
              <span className="count">{statusCounts.CLOSED}</span>
              <span className="label">Closed</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Priority Distribution</h3>
          <div className="priority-list">
            <div className="priority-item high">
              <span>High Priority: {priorityDistribution.HIGH}</span>
            </div>
            <div className="priority-item medium">
              <span>Medium Priority: {priorityDistribution.MEDIUM}</span>
            </div>
            <div className="priority-item low">
              <span>Low Priority: {priorityDistribution.LOW}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card recent-requests">
          <h3>Recent Requests</h3>
          <div className="recent-list">
            {recentRequests.map((request) => (
              <div key={request.id} className="recent-item">
                <div className="recent-title">{request.title}</div>
                <div className="recent-meta">
                  <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span>
                  <span className="date">{new Date(request.createdDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
