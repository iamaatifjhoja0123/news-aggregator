# The main EC2 Server where our Docker Compose stack will run
resource "aws_instance" "docker_server" {
  ami           = "ami-02eb0c2388ee999f9" 
  instance_type = "t3.micro"
  key_name      = "jjj1" 

  # 10GB root volume is enough for our containers
  root_block_device {
    volume_size = 10
    volume_type = "gp3" 
  }

  # Attach the Security Group and IAM Profile
  vpc_security_group_ids = [aws_security_group.docker_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name

  # Bootstrap script to install Docker & Docker Compose on startup
  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              
              # Install and start Docker
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