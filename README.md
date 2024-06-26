# LifeScribe

## Overview

This is a personal side project that I and [@Zhenke](https://github.com/zhxu7000) developed. The project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and showcases responsive design and modern web development practices. The primary objective of this project is to deepen my understanding of full-stack web development and to experiment with Docker workflows.

## Project Highlights

- **MERN Stack:** Utilizes MongoDB for database management, Express.js and Node.js for the backend, and React for the frontend.
- **Socket.IO**: Used for implementing real-time chat between users.
- **Google Vision API**: Used for implementing image-to-text transformation.
- **Responsive Design:** Ensures the application is usable across various devices and screen sizes.
- **Docker Integration:** Implements Docker workflows for isolated environment testing upon merging code branches.

## Functionalities

- User authentication
- Public/ like/ comment posts
- Real-time chat between two users
- Transfer image to text to generate the post description
- Responsive design with MUI
- RESTful API design
- Dockerized development environment

## Installation and Setup

### Prerequisites

- Node.js 
- npm
- MongoDB
- Docker
- Git

### Download Repo

* Download the zip file 

OR

* Clone the repository:

    ```bash
    git clone https://github.com/real-qilinren/ProjectX.git
    cd ProjectX
    ```

### Backend Setup

1. Install backend dependencies:

    ```
    cd sever
    npm install
    ```

2. Configure environment variables (create a file named `.env` inside the `server` directory) to 

    * configure the database connection
    * configure the JWT encryption
    * configure the port that your backend server will be running on

    ```bash
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    PORT=<your-port>
    ```

3. Add and name your own [Google Vision API](https://cloud.google.com/vision/docs) configuration file as `google-vision-api.json` inside `server/services` directory.

4. Start the backend server:

    ```bash
    nodemon run start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd client
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server and by default, your frontend will be running on the port 3000:

    ```bash
    npm run start
    ```

### Docker Setup

1. Ensure Docker is installed and running on your machine.

2. Build and run the Docker containers in the project root directory (Please note a sample test `server/test/register.test.js` will be executed as well when running the following command, and you can customise your tests inside the `server/test` directory):

    ```
    docker-compose up --build
    ```

## Docker Workflow Overview

This project includes a CI/CD pipeline that uses Docker to build and test the application on every merge to the main branch. This ensures code integrity and environment consistency. 

### CI/CD Pipeline

The pipeline is triggered on pull requests to the master branch and performs the following steps:

1. **Set Up MongoDB Service:** A MongoDB container is started.
2. **Check Out Code:** The latest code is checked out from the repository.
3. **Set Up Docker Buildx:** Docker Buildx is set up for building images.
4. **Build Docker Images:** Docker images are built using the `docker-compose.yml` file.

## Acknowledgments

- Special thanks to [EdRoh](https://www.youtube.com/@EdRohDev) for the comprehensive tutorial series.
