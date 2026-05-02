# 1. AWS Provider
provider "aws" {
  region = "ap-south-1" 
}

# 2. ECR Repositories 
resource "aws_ecr_repository" "frontend_repo" {
  name                 = "news-frontend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "aws_ecr_repository" "backend_repo" {
  name                 = "news-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

# 3. IAM Role 
resource "aws_iam_role" "ec2_ecr_role" {
  name = "ec2_ecr_access_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecr_read_only" {
  role       = aws_iam_role.ec2_ecr_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2_ecr_profile"
  role = aws_iam_role.ec2_ecr_role.name
}

# 4. Security Group 
resource "aws_security_group" "docker_sg" {
  name        = "docker_news_sg"
  description = "Allow SSH, HTTP, and Backend ports"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 5. EC2 Instance (Auto-install Docker & Docker Compose)
resource "aws_instance" "docker_server" {
  ami           = "ami-02eb0c2388ee999f9" 
  instance_type = "t3.micro"
  key_name      = "jjj1" 

  # Storage Configuration 
  root_block_device {
    volume_size = 10
    volume_type = "gp3" 
  }

  vpc_security_group_ids = [aws_security_group.docker_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name

  # script server automatically Docker 
  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install -y docker
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ec2-user
              
              # Install Docker Compose
              curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              EOF

  tags = {
    Name = "Docker-News-Server"
  }
}

# 6. Outputs 
output "ec2_public_ip" {
  value = aws_instance.docker_server.public_ip
}

output "frontend_ecr_url" {
  value = aws_ecr_repository.frontend_repo.repository_url
}

output "backend_ecr_url" {
  value = aws_ecr_repository.backend_repo.repository_url
}