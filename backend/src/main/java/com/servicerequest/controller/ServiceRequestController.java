package com.servicerequest.controller;

import com.servicerequest.model.ServiceRequest;
import com.servicerequest.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceRequestController {
    
    @Autowired
    private ServiceRequestService service;
    
    @GetMapping
    public ResponseEntity<List<ServiceRequest>> getAllRequests() {
        List<ServiceRequest> requests = service.getAllRequests();
        return ResponseEntity.ok(requests);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequest> getRequestById(@PathVariable Long id) {
        return service.getRequestById(id)
            .map(request -> ResponseEntity.ok(request))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ServiceRequest> createRequest(@RequestBody ServiceRequest request) {
        try {
            ServiceRequest createdRequest = service.createRequest(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ServiceRequest> updateRequest(@PathVariable Long id, 
                                                       @RequestBody ServiceRequest request) {
        try {
            ServiceRequest updatedRequest = service.updateRequest(id, request);
            return ResponseEntity.ok(updatedRequest);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<ServiceRequest> updateStatus(@PathVariable Long id, 
                                                      @RequestBody Map<String, String> statusUpdate) {
        try {
            String statusStr = statusUpdate.get("status");
            ServiceRequest.Status status = ServiceRequest.Status.valueOf(statusStr);
            ServiceRequest updatedRequest = service.updateStatus(id, status);
            return ResponseEntity.ok(updatedRequest);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        try {
            service.deleteRequest(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ServiceRequest>> getRequestsByStatus(@PathVariable String status) {
        try {
            ServiceRequest.Status requestStatus = ServiceRequest.Status.valueOf(status.toUpperCase());
            List<ServiceRequest> requests = service.getRequestsByStatus(requestStatus);
            return ResponseEntity.ok(requests);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<ServiceRequest>> getRequestsByPriority(@PathVariable String priority) {
        try {
            ServiceRequest.Priority requestPriority = ServiceRequest.Priority.valueOf(priority.toUpperCase());
            List<ServiceRequest> requests = service.getRequestsByPriority(requestPriority);
            return ResponseEntity.ok(requests);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ServiceRequest>> searchRequests(@RequestParam String keyword) {
        List<ServiceRequest> requests = service.searchRequests(keyword);
        return ResponseEntity.ok(requests);
    }
    
    @GetMapping("/recent")
    public ResponseEntity<List<ServiceRequest>> getRecentRequests() {
        List<ServiceRequest> requests = service.getRecentRequests();
        return ResponseEntity.ok(requests);
    }
}
