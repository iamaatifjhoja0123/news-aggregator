# 1. Provider Configuration
provider "aws" {
  region = "ap-south-1" # Mumbai Region
}

# 2. Security Group (Firewall Rules)
resource "aws_security_group" "news_sg" {
  name        = "news-aggregator-sg"
  description = "Allow HTTP, HTTPS, SSH, and Node Port"

  # SSH (Port 22) - Server me login karne ke liye
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # HTTP (Port 80) - Website access ke liye
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # HTTPS (Port 443) - Secure connection ke liye (SSL baad mein lagane ke liye)
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # Backend API (Port 5000) - Node.js ke liye
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # Outbound Rules - Server internet access kar sake (updates/API fetch ke liye)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. EC2 Instance Configuration
resource "aws_instance" "news_server" {
  ami           = "ami-045443a70fafb8bbc" # Amazon Linux provided by you
  instance_type = "t3.micro"
  security_groups = [aws_security_group.news_sg.name]
  key_name      = "jjj1" # Aapka existing Key Pair

  # Storage Configuration (10 GiB)
  root_block_device {
    volume_size = 10
    volume_type = "gp3" # gp3 aajkal sabse best aur fast SSD option hai free/low cost mein
  }

  tags = {
    Name        = "NewsAggregator-Prod"
    Environment = "Production"
  }
}

# 4. Output (Deployment ke baad IP yahan print hoga)
output "public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.news_server.public_ip
}