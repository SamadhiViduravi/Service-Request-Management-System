"use client"

import { useState } from "react"

const ServiceRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "TECHNICAL",
    priority: "MEDIUM",
    requesterName: "",
    requesterEmail: "",
    department: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: "TECHNICAL", label: "Technical Support" },
    { value: "MAINTENANCE", label: "Maintenance" },
    { value: "ACCESS", label: "Access Request" },
    { value: "EQUIPMENT", label: "Equipment" },
    { value: "OTHER", label: "Other" },
  ]

  const priorities = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.requesterName.trim()) {
      newErrors.requesterName = "Requester name is required"
    }

    if (!formData.requesterEmail.trim()) {
      newErrors.requesterEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.requesterEmail)) {
      newErrors.requesterEmail = "Email is invalid"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({
        title: "",
        description: "",
        category: "TECHNICAL",
        priority: "MEDIUM",
        requesterName: "",
        requesterEmail: "",
        department: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Create New Service Request</h2>
      <form onSubmit={handleSubmit} className="service-request-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={errors.description ? "error" : ""}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="requesterName">Requester Name *</label>
            <input
              type="text"
              id="requesterName"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleChange}
              className={errors.requesterName ? "error" : ""}
            />
            {errors.requesterName && <span className="error-message">{errors.requesterName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="requesterEmail">Email *</label>
            <input
              type="email"
              id="requesterEmail"
              name="requesterEmail"
              value={formData.requesterEmail}
              onChange={handleChange}
              className={errors.requesterEmail ? "error" : ""}
            />
            {errors.requesterEmail && <span className="error-message">{errors.requesterEmail}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  )
}

export default ServiceRequestForm
