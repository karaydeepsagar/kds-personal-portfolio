export const portfolioData = {
    personalInfo: {
        name: "Deep Sagar Karay",
        role: "Cloud | DevOps Engineer",
        email: "karaydeepsagar@gmail.com",
        phone: "+91 8522011851",
        linkedin: "linkedin.com/in/karaydeepsagar",
        location: "Kakinada, Andhra Pradesh, India",
        languages: ["English", "Hindi", "Telugu"],
        summary: "Architecting the future of Cloud Infrastructure through expert design of resilient multi-cloud ecosystems across AWS, Azure, and GCP. Specialist in advanced CI/CD Automation, Kubernetes Orchestration, and the strategic integration of diverse DevOps tools to streamline project deliverables. Proven leader in designing zero-trust scalable systems that bridge the gap between high-velocity development and robust operational stability."
    },
    skills: {
        Cloud: ["AWS", "Azure", "GCP"],
        Scripting: ["(BASH) Shell Scripting"],
        OS: ["Red Hat", "Ubuntu", "CentOS", "Window Server 2019", "Mac OS"],
        "CI/CD": ["Jenkins", "Gitlab", "GitHub", "Bitbucket"],
        "Infrastructure as Code": ["Ansible", "Terraform", "Cloud Formation (AWS)", "ARM Azure"],
        Containerization: ["Docker", "Kubernetes", "Packer"],
        Monitoring: ["AWS CloudWatch", "Prometheus & Grafana", "ELK Stack", "Datadog"],
        "AI Tools": ["Anti Gravity", "Claude AI", "ChatGPT", "Gemini Pro"]
    },
    certifications: [
        {
            name: "AWS Solution Architect Associate",
            code: "SSA-CO3",
            issuer: "Amazon Web Services"
        },
        {
            name: "Azure Fundamentals",
            code: "AZ-900",
            issuer: "Microsoft"
        }
    ],
    education: [
        {
            degree: "B. TECH | Electrical and Electronics Engineering",
            year: "2019",
            details: "Aggregate of 65%"
        }
    ],
    experience: [
        {
            company: "TIETOEVRY",
            role: "DevOps Consultant",
            period: "Dec 2024 – Present",
            client: "ANBTX (American National Bank of Texas)",
            responsibilities: [
                "Monitor and maintain Bitbucket pipelines for Salesforce/MuleSoft/API/ETL deployments.",
                "Trigger, review, and debug builds and deployments (e.g., MuleSoft APIs, DBT jobs). Update Confluence with deployment plans, release notes, and rollback procedures.",
                "Collaborate with developers to manage branching strategies and merge requests.",
                "Design and deploy secure, version-controlled APIs via MuleSoft Anypoint Platform.",
                "Track API performance, latency, and retry logic using Datadog dashboards.",
                "Using Jira for ticket assignment, sprint planning, and task tracking."
            ],
            tools: "Salesforce, Mule Soft, Data dog, Jira, Webex, Postman, ETL tools, & other."
        },
        {
            company: "AMDOCS (Pay Role: NITYO Infotech)",
            role: "Cloud DevOps Engineer",
            period: "Feb 2023 – Sep 2024",
            client: "AT&T",
            responsibilities: [
                "Ensured end-to-end infrastructure provisioning, security operations, and deployment automation on Azure Cloud.",
                "Managed application control operations, monitored metrics for network traffic, databases, and deployments.",
                "Provisioned and managed Azure infrastructure (Virtual Machines, VNets, Load Balancers, Storage Accounts) using Terraform.",
                "Built reusable Terraform modules to streamline infrastructure deployment for environments (dev, staging, prod).",
                "Integrated Terraform and Ansible into Azure DevOps (ADO) pipelines to enable automated CI/CD workflows.",
                "Implemented DR and HA strategies using Azure native services with failover clusters and autoscaling policies.",
                "Architected and deployed multi-region infrastructure ensuring fault tolerance and high availability.",
                "Developed Ansible playbooks for tasks like patching, user management, and SSH key rotation for security automation.",
                "Optimized cost and resource management through automation and tagging strategies.",
                "Secured deployments by integrating Azure Key Vault with Terraform and Ansible for secrets management."
            ],
            tools: "Azure Cloud, Azure DevOps, Terraform, Ansible, Azure Key Vault, Git, YAML Pipelines, PowerShell, Bash, Databases (SQL/NoSQL), Monitoring Tools (Azure Monitor, Log Analytics)"
        },
        {
            company: "TECH PRIMO SOLUTIONS",
            role: "DevOps Specialist",
            period: "March 2022 – Oct 2022",
            client: "FINONE Technologies (MUVIN e-Banking App)",
            responsibilities: [
                "Focused on build & release management, CI/CD pipeline operations. Provisioned and configured secure, cloud-based infrastructure.",
                "Designed and maintained CI/CD pipelines using Jenkins, enabling automated deployments and seamless updates.",
                "Used Ansible and Docker for configuration management and environment consistency across Dev, QA, and Prod.",
                "Configured and managed OpenVPN user authentication, ensuring secure connectivity for remote service access.",
                "Managed Kubernetes deployments, including writing and updating YAML files for deployments and services.",
                "Implemented infrastructure monitoring and alerting systems to proactively detect failures and improve system reliability.",
                "Applied security patches and updates regularly, maintaining a hardened and compliant infrastructure environment.",
                "Conducted incident management and RCA during deployment downtime to minimize service impact and prevent recurrence.",
                "Contributed to project management decisions by providing technical feedback on deployment strategies and automation scope."
            ],
            tools: "Jenkins, Terraform, Ansible, Docker, Kubernetes, OpenVPN, Linux, Monitoring Tools New Relic, AWS Cloud Infrastructure, Git, CI/CD pipelines, JIRA"
        },
        {
            company: "C360 SOFTWARE",
            role: "AWS DevOps Engineer",
            period: "July 2021 – Feb 2022",
            client: "HITACHI (Rean Cloud Platform)",
            responsibilities: [
                "Responsible for provisioning and managing cloud infrastructure for development, testing, and database teams.",
                "Automated deployments, backup operations, and high-availability configurations using various AWS and DevOps tools.",
                "Contributed to a cloud-native project for Provisioned AWS services and resources using Terraform, including EC2, EBS, S3, VPC, Subnets, ELB, Security Groups, Auto Scaling, and Route Tables.",
                "Created and maintained Jenkins CI/CD pipelines to automate infrastructure deployments, application releases, and artifacts/Docker images to AWS ECR and S3.",
                "Configured Elastic Load Balancers (ELB) and Auto Scaling Groups to ensure high availability and load distribution.",
                "Supported developers and DBAs with tailored infrastructure environments to meet their planning and testing needs."
            ],
            tools: "AWS Cloud, EC2, S3, EBS, ELB, ASG, VPC, Route Tables, Terraform, Jenkins, Docker, AWS ECR, Ansible, Packer, Git, Linux"
        },
        {
            company: "SNEHA ENTERPRISES",
            role: "DevOps Engineer",
            period: "Sep 2020 – May 2021",
            client: "INFOWARE Solutions (Enterprise Web Application Support)",
            responsibilities: [
                "Provided cloud-based infrastructure and build support to a globally distributed development and QA team.",
                "Played a key role in configuration, issue resolution, and deployment readiness of applications in test and pre-production environments.",
                "Configured and managed cloud environments for application testing and release cycles.",
                "Provided Level 1 and Level 2 technical support, resolving deployment and environment issues, including log analysis and restart/redeploy operations.",
                "Developed lightweight automation scripts using Shell and Ansible to speed up environment provisioning.",
                "Assisted in migrating infrastructure configurations from manual setups to version-controlled templates using Terraform basics for EC2, S3, and VPC modules."
            ],
            tools: "AWS, EC2, S3, VPC, Jenkins, Git, Shell Scripting, Ansible, CloudWatch, Linux, Basic Terraform Modules, Nexus and Jfrog Artifactory"
        },
        {
            company: "DIGITAL LYNC",
            role: "Internship AWS & DevOps Engineer",
            period: "JAN 2020 – June 2020",
            client: "Internal Project (Java Web App Deployment & CI/CD Learning)",
            responsibilities: [
                "Contributed to automation and deployment tasks in a lab-based learning environment.",
                "Set up and maintained CI/CD pipelines using Jenkins, enabling automated builds, testing, and deployments.",
                "Containerized Java web projects using Docker, building custom images and deploying containers for functional testing.",
                "Explored infrastructure management with AWS services such as EC2, S3, and IAM.",
                "Learned and applied best practices for code integration and versioning."
            ],
            tools: "AWS, EC2, S3, IAM, Jenkins, Git, Docker, Linux, Shell Scripting, Basic HTML/CSS for Web UI, GitHub, Java Web Application Deployment"
        }
    ],
    projects: [
        {
            id: 1,
            title: "Highly Available Three-Tier Web Infrastructure",
            description: "Architected and deployed a production-grade three-tier web application on AWS, ensuring 99.99% availability. Leveraged Multi-AZ deployments for RDS, Auto Scaling Groups across three Availability Zones, and Application Load Balancers. Implemented security hardening through private subnets, NAT Gateways, and granular Security Group policies to ensure zero-trust architecture between the Web, App, and Database layers.",
            technologies: ["AWS", "VPC", "EC2", "RDS", "ALB", "ASG", "Terraform", "CloudWatch"],
            link: "https://github.com/karaydeepsagar/docker_terraform-three-tier-architecture",
            image: "https://controlmonkey.io/wp-content/uploads/2025/08/Terraform-on-AWS-Providers.png", // Server/Infrastructure
            demo: null
        },
        {
            id: 2,
            title: "Multi-Cloud Infrastructure Automation",
            description: "Developed an enterprise-grade Infrastructure as Code (IaC) framework using Terraform and Terragrunt to manage hybrid cloud resources. Standardized deployment patterns across AWS and Azure, implementing automated compliance checks and state management in encrypted S3 buckets, reducing infrastructure lead time from days to minutes.",
            technologies: ["Terraform", "AWS", "Azure", "GitHub Actions", "Python", "Terragrunt"],
            link: "https://github.com/karaydeepsagar/multi-cloud-iac",
            image: "https://www.sangfor.com/sites/default/files/inline-images/What-is-Cloud-Automation.jpg",
            demo: null
        },
        {
            id: 3,
            title: "Enterprise DevSecOps Pipeline",
            description: "Engineered an end-to-end automated deployment pipeline for microservices. Integrated Shift-Left security practices including static analysis (SonarQube), dependency vulnerability scanning (Trivy), and container image signing. Orchestrated zero-downtime deployments to EKS using Helm and Canary release strategies.",
            technologies: ["Jenkins", "Kubernetes", "SonarQube", "Trivy", "Helm", "ArgoCD", "AWS EKS"],
            link: "https://github.com/karaydeepsagar/devsecops-pipeline",
            image: "https://qentelli.com/sites/default/files/2025-02/Building%20a%20DevSecOps%20Maturity%20Model%201_0.png",
            demo: null
        }
    ],
    blogs: [
        {
            id: 1,
            title: "Mastering Terraform State Management",
            summary: "Collaborating on Infrastructure as Code can be tricky. Learn how to effectively manage remote state, locking, and backend configurations to prevent conflicts and data loss in large teams.",
            date: "October 15, 2025",
            readTime: "5 min read",
            image: "https://astconsulting.in/wp-content/uploads/2025/10/mastering-infrastructure-as-code-comparing-terraform-and-opentofu-for-optimal-deployment-featured-1.jpg",
            link: "#"
        },
        {
            id: 2,
            title: "Kubernetes Orchestration",
            summary: "A deep dive into managing Kubernetes at enterprise scale requires balancing security, reliability, and operational efficiency across clusters and environments. As organizations grow, so does the complexity of managing Kubernetes infrastructure, networking, and access controls.",
            date: "September 22, 2025",
            readTime: "8 min read",
            image: "https://www.simplyblock.io/wp-content/media/Kubernetes.png?ver=f0fcc7590cc003a17022e897c61660fea84ff93b",
            link: "#"
        },
        {
            id: 3,
            title: "Securing CI/CD Pipelines",
            summary: "Security shouldn't be an afterthought. Discover actionable steps to secure your build pipelines, manage secrets safely, and implement automated vulnerability scanning used in modern DevSecOps.",
            date: "August 10, 2025",
            readTime: "6 min read",
            image: "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fkd3dzgqr2bwmlxdybcib.jpg", // Lock/Sec
            link: "#"
        }
    ]
};
