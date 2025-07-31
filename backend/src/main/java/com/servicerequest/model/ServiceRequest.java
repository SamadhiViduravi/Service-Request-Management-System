package com.servicerequest.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false, length = 1000)
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
    
    @Column(name = "requester_name", nullable = false)
    private String requesterName;
    
    @Column(name = "requester_email", nullable = false)
    private String requesterEmail;
    
    private String department;
    
    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;
    
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
    
    // Constructors
    public ServiceRequest() {
        this.status = Status.OPEN;
        this.createdDate = LocalDateTime.now();
    }
    
    public ServiceRequest(String title, String description, Category category, 
                         Priority priority, String requesterName, String requesterEmail) {
        this();
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.requesterName = requesterName;
        this.requesterEmail = requesterEmail;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Category getCategory() {
        return category;
    }
    
    public void setCategory(Category category) {
        this.category = category;
    }
    
    public Priority getPriority() {
        return priority;
    }
    
    public void setPriority(Priority priority) {
        this.priority = priority;
    }
    
    public Status getStatus() {
        return status;
    }
    
    public void setStatus(Status status) {
        this.status = status;
        this.updatedDate = LocalDateTime.now();
    }
    
    public String getRequesterName() {
        return requesterName;
    }
    
    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }
    
    public String getRequesterEmail() {
        return requesterEmail;
    }
    
    public void setRequesterEmail(String requesterEmail) {
        this.requesterEmail = requesterEmail;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
    
    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
    
    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }
    
    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }
    
    // Enums
    public enum Category {
        TECHNICAL, MAINTENANCE, ACCESS, EQUIPMENT, OTHER
    }
    
    public enum Priority {
        LOW, MEDIUM, HIGH
    }
    
    public enum Status {
        OPEN, IN_PROGRESS, RESOLVED, CLOSED
    }
}
