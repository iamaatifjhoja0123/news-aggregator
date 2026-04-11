# 🌍 Top10News - Real-Time Global News Aggregator

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

Top10News is a modern, containerized full-stack news aggregator that fetches and displays the latest breaking news from top global sources. The application is built with React and Node.js, fully Dockerized, and deployed on AWS EC2 using a robust CI/CD pipeline and Infrastructure as Code (IaC).

🔗 **Live Demo:** [http://top10news.jhoja.tech/](http://top10news.jhoja.tech/)

---

## ✨ Key Features
* **Real-Time Data:** Fetches the latest global news using the GNews API.
* **Smart API Load Balancing:** Implements dynamic API Key Rotation in the Node.js backend to bypass free-tier rate limits and ensure maximum uptime.
* **Containerized Architecture:** Both frontend and backend are fully Dockerized, ensuring consistent environments from local development to production.
* **Nginx Reverse Proxy:** Internal routing between React frontend and Express backend configured securely via Nginx inside Docker.
* **Automated CI/CD Pipeline:** GitHub Actions automatically builds Docker images, pushes them to AWS ECR, and deploys containers to AWS EC2 on every commit to the `main` branch.
* **Infrastructure as Code:** AWS infrastructure (EC2, ECR, IAM Roles, Security Groups) provisioned seamlessly using Terraform.

---

## 🏗️ Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS, Lucide React (Icons)
* **Web Server:** Nginx (Alpine)

### Backend
* **Runtime:** Node.js with Express.js
* **Security:** CORS, Dotenv
* **External API:** GNews API

### Cloud & DevOps
* **Containerization:** Docker & Docker Compose
* **Cloud Provider:** AWS (EC2, ECR, IAM)
* **IaC:** Terraform
* **CI/CD:** GitHub Actions

---

## ⚙️ Local Development Setup

Follow these steps to run the project locally on your machine.

**1. Clone the repository**
```bash
git clone [https://github.com/iamaatifjhoja0123/news-aggregator.git](https://github.com/iamaatifjhoja0123/news-aggregator.git)
cd news-aggregator