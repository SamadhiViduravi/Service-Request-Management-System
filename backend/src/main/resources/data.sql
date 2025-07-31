-- Sample data for testing
INSERT INTO service_requests (title, description, category, priority, status, requester_name, requester_email, department, created_date) VALUES
('Network Connectivity Issue', 'Unable to connect to company network from workstation', 'TECHNICAL', 'HIGH', 'OPEN', 'John Smith', 'john.smith@company.com', 'IT', CURRENT_TIMESTAMP),
('Printer Maintenance', 'Office printer needs routine maintenance and toner replacement', 'MAINTENANCE', 'MEDIUM', 'IN_PROGRESS', 'Sarah Johnson', 'sarah.johnson@company.com', 'Administration', CURRENT_TIMESTAMP),
('Access Card Request', 'New employee needs building access card', 'ACCESS', 'MEDIUM', 'RESOLVED', 'Mike Davis', 'mike.davis@company.com', 'HR', CURRENT_TIMESTAMP),
('Laptop Hardware Issue', 'Laptop screen flickering and keyboard not responding properly', 'EQUIPMENT', 'HIGH', 'OPEN', 'Emily Wilson', 'emily.wilson@company.com', 'Marketing', CURRENT_TIMESTAMP),
('Software Installation', 'Need Adobe Creative Suite installed on workstation', 'TECHNICAL', 'LOW', 'CLOSED', 'David Brown', 'david.brown@company.com', 'Design', CURRENT_TIMESTAMP);
