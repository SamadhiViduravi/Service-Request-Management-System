package com.servicerequest.service;

import com.servicerequest.model.ServiceRequest;
import com.servicerequest.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceRequestService {
    
    @Autowired
    private ServiceRequestRepository repository;
    
    public List<ServiceRequest> getAllRequests() {
        return repository.findAll();
    }
    
    public Optional<ServiceRequest> getRequestById(Long id) {
        return repository.findById(id);
    }
    
    public ServiceRequest createRequest(ServiceRequest request) {
        request.setCreatedDate(LocalDateTime.now());
        request.setStatus(ServiceRequest.Status.OPEN);
        return repository.save(request);
    }
    
    public ServiceRequest updateRequest(Long id, ServiceRequest updatedRequest) {
        return repository.findById(id)
            .map(request -> {
                request.setTitle(updatedRequest.getTitle());
                request.setDescription(updatedRequest.getDescription());
                request.setCategory(updatedRequest.getCategory());
                request.setPriority(updatedRequest.getPriority());
                request.setDepartment(updatedRequest.getDepartment());
                request.setUpdatedDate(LocalDateTime.now());
                return repository.save(request);
            })
            .orElseThrow(() -> new RuntimeException("Service request not found with id: " + id));
    }
    
    public ServiceRequest updateStatus(Long id, ServiceRequest.Status status) {
        return repository.findById(id)
            .map(request -> {
                request.setStatus(status);
                request.setUpdatedDate(LocalDateTime.now());
                return repository.save(request);
            })
            .orElseThrow(() -> new RuntimeException("Service request not found with id: " + id));
    }
    
    public void deleteRequest(Long id) {
        repository.deleteById(id);
    }
    
    public List<ServiceRequest> getRequestsByStatus(ServiceRequest.Status status) {
        return repository.findByStatus(status);
    }
    
    public List<ServiceRequest> getRequestsByPriority(ServiceRequest.Priority priority) {
        return repository.findByPriority(priority);
    }
    
    public List<ServiceRequest> searchRequests(String keyword) {
        return repository.findByTitleOrDescriptionContaining(keyword);
    }
    
    public Long getRequestCountByStatus(ServiceRequest.Status status) {
        return repository.countByStatus(status);
    }
    
    public List<ServiceRequest> getRecentRequests() {
        return repository.findTop10ByOrderByCreatedDateDesc();
    }
}
