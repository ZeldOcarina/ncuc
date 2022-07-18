pipeline {
    agent any

    stages {
        stage("Check Environment"){
            steps {
                echo "PATH is: ${env.PATH}"
                sh "node -v"
                sh "yarn -v"
                sh "npm -v"
            }
        }
        stage("Clean Up"){
            steps {
                dir("ncuc"){
                    deleteDir()
                }
                echo "Directory fully cleaned up"
            }
        }
        stage("Clone Repo"){
            steps {
                sh "git clone https://github.com/ZeldOcarina/ncuc.git"
            }
        }
        stage("Install Dependencies"){
            steps {
                dir("ncuc"){
                    sh "yarn install"
                }
            }
        }
        stage("Build"){
            steps {
                dir("ncuc"){
                    sh "cp ../.env.production ."
                    //sh "yarn clean"                
                    sh "yarn build"                    
                }
            }
        }
    }
}