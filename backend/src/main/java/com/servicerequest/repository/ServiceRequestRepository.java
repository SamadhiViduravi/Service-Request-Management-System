package com.servicerequest.repository;

import com.servicerequest.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    
    List<ServiceRequest> findByStatus(ServiceRequest.Status status);
    
    List<ServiceRequest> findByPriority(ServiceRequest.Priority priority);
    
    List<ServiceRequest> findByCategory(ServiceRequest.Category category);
    
    List<ServiceRequest> findByRequesterEmailIgnoreCase(String email);
    
    @Query("SELECT sr FROM ServiceRequest sr WHERE sr.title LIKE %?1% OR sr.description LIKE %?1%")
    List<ServiceRequest> findByTitleOrDescriptionContaining(String keyword);
    
    @Query("SELECT COUNT(sr) FROM ServiceRequest sr WHERE sr.status = ?1")
    Long countByStatus(ServiceRequest.Status status);
    
    List<ServiceRequest> findTop10ByOrderByCreatedDateDesc();
}
