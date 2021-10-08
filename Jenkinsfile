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
        try {
        stage('Unit Tests') {
            steps {
                sh 'yarn workspaces run jest --coverage --coverageDirectory=output/coverage/jest'
            }           
            
            post {
                always {
                    // publishHTML (target : [allowMissing: false,
                    //     alwaysLinkToLastBuild: true,
                    //     keepAll: true,
                    //     reportDir: 'reports',
                    //     reportFiles: 'myreport.html',
                    //     reportName: 'My Reports',
                    //     reportTitles: 'The Report'])
                // publishHTML target: [
                //     allowMissing         : true,
                //     alwaysLinkToLastBuild: true,
                //     keepAll              : true,
                //     reportDir            : "../*/jenkins-unit-tests-main/branches/main/builds/${env.BUILD_NUMBER}/htmlreports/TestReport",
                //     reportFiles          : 'index.html',
                //     reportName           : 'TestReport'
                // ]
                // junit  allowEmptyResults: true, testResults: "jenkins-unit-tests-main/branches/main/builds/${env.BUILD_NUMBER}/htmlreports/TestReport"
                }
            }
        }
        }
            catch(err) {
                echo "error here: ${err}"

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