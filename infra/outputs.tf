# Print out the useful URLs and IPs after Terraform finishes
output "ec2_public_ip" {
  description = "Public IP of the deployed EC2 instance"
  value       = aws_instance.docker_server.public_ip
}

output "frontend_ecr_url" {
  description = "ECR Repository URL for the Frontend Image"
  value       = aws_ecr_repository.frontend_repo.repository_url
}

output "backend_ecr_url" {
  description = "ECR Repository URL for the Backend Image"
  value       = aws_ecr_repository.backend_repo.repository_url
}