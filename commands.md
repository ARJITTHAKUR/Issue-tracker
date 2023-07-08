CompileDaemon -command="./ISSUE-TRACKER"

$ docker build . -t go-container-latest

$ docker run -p 3000:3000 go-container-latest


docker run -p 8080:8080 go-container-latest