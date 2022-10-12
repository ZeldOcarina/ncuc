pipeline {
    agent any
    parameters{
        booleanParam(name: 'CLEAN_DEPLOYMENT', defaultValue: false, description: 'Do you want to run a clean deployment?')
    }
    stages {
        stage("Check Environment"){
            steps {
                echo "PATH is: ${env.PATH}"
                echo "current environment is located at ${env.WORKSPACE}"
                sh "node -v"
                sh "yarn -v"
                sh "npm -v"
                sh "whoami"
                sh "ls -lsa"
            }
        }
        stage("Clean Up"){
            steps {
                script {
                    if (params.CLEAN_DEPLOYMENT == true) {
                        sh "rm -rf node_modules yarn.lock"

                        dir("backend") {
                            sh "rm -rf node_modules yarn.lock"
                        }
                        echo "Directories fully cleaned up"
                    }
                }
            }
        }
        stage("Install Dependencies"){
            steps {
                sh "yarn install"   
                dir("backend") {
                    sh "yarn install"
                }                    
            }
        }
        stage("Build"){
            steps {
                sh "cp /var/lib/jenkins/workspace/secrets/staging-ncuc/.env.production ."
                dir("backend") {
                    sh "sudo cp /var/lib/jenkins/workspace/secrets/staging-ncuc/.env ."
                }
                dir("${env.WORKSPACE}") {
                    script {
                        if (params.CLEAN_DEPLOYMENT == true) {
                            sh "yarn clean"
                        }
                    }
                    sh "yarn build"
                }                
            }
        }
        stage("Move Assets"){
            steps {   
                sh """
                    sudo rm -rf /var/www/html/staging-ncuc/*
                    sudo cp -r public /var/www/html/staging-ncuc/
                    sudo cp -r backend /var/www/html/staging-ncuc/
                    sudo mkdir /var/www/html/staging-ncuc/backend/logs
                    sudo chown -R mattiarasulo:www-data /var/www/html/staging-ncuc/
                    sudo chown -R mattiarasulo:www-data /var/www/html/staging-ncuc/*
                    sudo chmod -R 776 /var/www/html/staging-ncuc/
                    sudo chmod -R 776 /var/www/html/staging-ncuc/*
                """                        
            }
        }
    }
}
