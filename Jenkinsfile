def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger',]

pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Test') {
            steps {
                echo "---Testing---"
            }
        }
        stage('Prepare') {
            steps {
                sh "npm install -g yarn"
                sh "yarn install"
            }            
        }
        stage('Unit Tests') {
            steps {
                script {
                    try {
                        sh 'yarn workspaces run jest --coverage'
                    }
                    catch(err) {
                        slackSend channel: '#jenkins', color: COLOR_MAP['FAILURE'], message: "*FAILURE:* The tests for ${env.JOB_NAME} on build# ${env.BUILD_NUMBER} did not meet requirements. \n More info at: ${env.BUILD_URL}"
                        echo "what ${err} ${currentBuild.result}"
                        throw err
                    }
                }
            }
        }
        stage('e2e Tests') {
            steps {
                sh 'yarn workspaces run test:e2e'
            }
        }
        stage('Slack it!') {
            steps {
                echo "---Testing Sending Slack Message---"
                slackSend channel: '#jenkins', color: COLOR_MAP[currentBuild.currentResult], message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by Tania Simpson \n More info at: ${env.BUILD_URL}"
            }
        }
    }
}