pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    environment {
        VM_HOST = "10.34.100.178"
        APP_PORT = "8081"
        APP_NAME = "kelompok1_app"
        DB_NAME  = "kelompok1_db"
        IMAGE_NAME = "kelompok1_image"
        IMAGE_TAG  = "${BUILD_NUMBER}"
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                dir('app-web') {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Transfer Image') {
            steps {
                sh "docker save ${IMAGE_NAME}:${IMAGE_TAG} | gzip > image.tar.gz"
                
                sshagent(['vm-kelompok1-ssh']) {
                    sh """
                    scp -o StrictHostKeyChecking=no image.tar.gz deploy@${VM_HOST}:/tmp/
                    """
                }
            }
        }

        stage('Deploy on VM') {
            steps {
                sshagent(['vm-kelompok1-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no deploy@${VM_HOST} '
                        docker load < /tmp/image.tar.gz

                        docker stop ${APP_NAME} || true
                        docker rm ${APP_NAME} || true

                        docker run -d \
                            --name ${APP_NAME} \
                            --env-file /home/deploy/.env \
                            --restart unless-stopped \
                            -p ${APP_PORT}:3000 \
                            ${IMAGE_NAME}:${IMAGE_TAG}

                        sleep 10

                        docker exec ${APP_NAME} bunx prisma db push || exit 1
                        docker exec ${APP_NAME} bun run db:seed || exit 1
                    '
                    """
                }
            }
        }

        stage('Verify') {
            steps {
                sh "curl -f http://${VM_HOST}:${APP_PORT} || exit 1"
            }
        }
    }

    post {
        success {
            echo "✅ Deploy sukses: http://${VM_HOST}:${APP_PORT}"
        }
        failure {
            echo "❌ Deploy gagal"
        }
    }
}