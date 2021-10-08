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
                        echo "what ${err} ${currentBuild.result}"
                    }
                }
            }
            post {
                    always {
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: false,
                            includes: '**/*',
                            keepAll: true,
                            reportDir: 'reports/',
                            reportFiles: 'report.html',
                            reportName: 'HTML Report',
                            reportTitles: 'FH BP'
                        ])
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