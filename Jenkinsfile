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
        stage('Unit Tests For Hello-One App') {
            steps {
                script {
                    try {
                        sh 'yarn workspace hello-one run jest --coverage'
                    }
                    catch(err) {
                        slackSend channel: '#jenkins', color: COLOR_MAP['FAILURE'], message: "*FAILURE:* The tests for ${env.JOB_NAME}, application hello-one, on build# ${env.BUILD_NUMBER} did not meet requirements. \n More info at: ${env.BUILD_URL}/HelloOne_TestCoverage"
                        echo "what ${err} ${currentBuild.result}"
                        throw err
                    }
                }
            }
            post {
                always {
                publishHTML target: [
                    allowMissing         : false,
                    alwaysLinkToLastBuild: true,
                    keepAll              : true,
                    reportDir            : "apps/hello-one/coverage/lcov-report",
                    reportFiles          : 'index.html',
                    reportName           : 'HelloOne_TestCoverage'
                ]
                }
            }
        }
        stage('Unit Tests For Hello-Two App') {
            steps {
                script {
                    try {
                        sh 'yarn workspace hello-two run jest --coverage'
                    }
                    catch(err) {
                        slackSend channel: '#jenkins', color: COLOR_MAP['FAILURE'], message: "*FAILURE:* The tests for ${env.JOB_NAME}, application hello-two, on build# ${env.BUILD_NUMBER} did not meet requirements. \n More info at: ${env.BUILD_URL}/HelloTwo_TestCoverage"
                        echo "what ${err} ${currentBuild.result}"
                        throw err
                    }
                }
            }
            post {
                always {
                publishHTML target: [
                    allowMissing         : false,
                    alwaysLinkToLastBuild: true,
                    keepAll              : true,
                    reportDir            : "apps/hello-two/coverage/lcov-report",
                    reportFiles          : 'index.html',
                    reportName           : 'HelloTwo_TestCoverage'
                ]
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