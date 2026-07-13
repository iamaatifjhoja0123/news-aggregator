# ECR Repositories for storing our Docker images
resource "aws_ecr_repository" "frontend_repo" {
  name                 = "news-frontend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true # Helpful for cleaning up during testing
}

resource "aws_ecr_repository" "backend_repo" {
  name                 = "news-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}