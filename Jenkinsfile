node ('jnlp-slave-with-java-build-tools') {

  def remote = [:]
  remote.name = "node"
  remote.host = "205.196.209.248"
  remote.allowAnyHosts = true

  stage('Cloning Git') {
    git(
      url: 'https://github.service.emory.edu/LITS/beckett-letters',
      credentialsId: 'integration-github',
      branch: "master"
    )
  }

  stage('Building source code') {
    sh 'npm install'
    sh 'yarn run build'
    sh 'tar -zcvf build.tar.gz build/
  }
  
  stage('Deploy') {
    withCredentials([usernamePassword(credentialsId: 'dreamhost-credentials', passwordVariable: 'password', usernameVariable: 'userName')]) {
      remote.user = userName
      remote.password = password
      stage("Copy artifact to remote") {
        sshPut remote: remote, from: 'build.tar.gz', into: '.'
      }
    }
  }
}
