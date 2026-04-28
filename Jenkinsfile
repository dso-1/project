pipeline {
    agent any

    environment {
        VM_HOST = "10.34.100.178"
        VM_USER = "deploy"
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

        stage('Deploy to VM') {
            steps {
                sh """
                docker save ${IMAGE_NAME}:${IMAGE_TAG} | gzip > image.tar.gz
                scp image.tar.gz ${VM_USER}@${VM_HOST}:/tmp/

                ssh ${VM_USER}@${VM_HOST} '
                    docker load < /tmp/image.tar.gz

                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker stop ${DB_NAME} || true
                    docker rm ${DB_NAME} || true

                    docker run -d \
                      --name ${DB_NAME} \
                      -e POSTGRES_USER=goreserve \
                      -e POSTGRES_PASSWORD=goreserve \
                      -e POSTGRES_DB=go_reserve \
                      -p 5432:5432 \
                      postgres:15

                    sleep 5

                    docker run -d \
                      --name ${APP_NAME} \
                      --link ${DB_NAME}:db \
                      -e DATABASE_URL=postgresql://goreserve:goreserve@db:5432/go_reserve \
                      -p ${APP_PORT}:3000 \
                      ${IMAGE_NAME}:${IMAGE_TAG}

                    sleep 5

                    docker exec ${APP_NAME} bunx prisma db push
                    docker exec ${APP_NAME} bun run db:seed
                '
                """
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
            echo "✅ Deploy sukses di http://${VM_HOST}:${APP_PORT}"
        }
        failure {
            echo "❌ Deploy gagal"
        }
    }
}