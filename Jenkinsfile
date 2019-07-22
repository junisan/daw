pipeline {
  agent any
  stages {
    stage('Build Dev'){
      when {
        expression { env.BRANCH_NAME != 'master' }
      }
      steps {
        sh 'npm i -D -E @ionic/app-scripts'
        sh 'ionic build'
      }
    }
    stage('Build PROD'){
      when{
        expression {env.BRANCH_NAME == 'master'}
      }
      steps {
        sh 'npm i -D -E @ionic/app-scripts'
        sh 'ionic build --prod'
      }
    }

    stage('Publish Dev'){
      when {
        expression { env.BRANCH_NAME != 'master' }
      }
      steps {
        sh 'rm -rf /home/juan/juannicolas.eu/dawtest1/*'
        sh 'cp -R www/* /home/juan/juannicolas.eu/dawtest1/'
      }
    }

    stage('Publish PROD'){
      when {
        expression { env.BRANCH_NAME == 'master' }
      }
      steps {
        sh 'rm -rf /home/juan/juannicolas.eu/daw/*'
        sh 'cp -R www/* /home/juan/juannicolas.eu/daw/'
      }
    }

  }

  post {
    success {
      emailext attachLog: true, body: "I have just finished job ${env.BUILD_ID} on project ${env.JOB_NAME}. The result was OK", subject: "Jenkins OK in job ${env.BUILD_ID} on ${env.JOB_NAME}", recipientProviders: [[$class: "DevelopersRecipientProvider"]]
    }
    failure {
      emailext attachLog: true, body: "I have just finished job ${env.BUILD_ID} on project ${env.JOB_NAME}. The result was OK", subject: "Jenkins error in job ${env.BUILD_ID} on ${env.JOB_NAME}", recipientProviders: [[$class: "DevelopersRecipientProvider"]]
    }

  }

}
