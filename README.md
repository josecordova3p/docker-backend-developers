# Docker for Backend Developers

## Demos
The purpose of this repo is to demo the usage of docker for common components used in developing APIs, such as relational databases, nosql databases, application servers, and web servers.

It also includes examples on how to build your own docker images, and using docker compose to create a complex environment.

Images are fetched from [Docker Hub](https://hub.docker.com/) unless the URL is explicitly mentioned.

### Prerequisites
You only need to have docker installed and a terminal.

If you are using minikube, you can find the ip with the minikube command and use that ip in the examples.
```
$ minikube ip
```
If you are using docker natively, you can use localhost or 127.0.0.1 for the examples.

### MySQL
```
$ docker pull mysql:8.0.11
$ docker run --name lab-mysql -e MYSQL_ROOT_PASSWORD=secret -p 3306:3306 -d mysql:8.0.11
$ docker run --name lab-mysql-8029 -e MYSQL_ROOT_PASSWORD=secret -p 3306:3306 -d mysql:8.0.29
```
```
SHOW DATABASESS
SELECT VERSION();
```

### Postgres
```
$ docker pull postgres:14.4
$ docker run --name lab-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:14.4
```
```
select version();
```

### Oracle XE
```
$ docker run --name lab-oraclexe -e ORACLE_ALLOW_REMOTE=true -p 1521:1521 -d oracleinanutshell/oracle-xe-11g:1.0.0
```
```
SELECT * FROM v$version;
```

### MS SQL Server Express
```
$ docker run --name lab-mssql -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=secret(#)Password" -e "MSSQL_PID=Express" -p 1433:1433 -h sql1 -d mcr.microsoft.com/mssql/server:2019-latest
```
```
SELECT @@VERSION
```

### Redis
```
$ docker run --name lab-redis -p 6379:6379 -d redis:7.0.4
$ docker network create lab
$ docker network connect lab lab-redis
$ docker run -it --rm --network lab redis:7.0.4 redis-cli -h lab-redis
```
```
ping
```

### MongoDB
```
$ docker run --name lab-mongo --network lab -p 27017:27017 -d mongo:5.0.9
$ docker run -it --network lab --rm mongo:5.0.9 mongo --host lab-mongo test
```
```
show dbs
```

### Java + Tomcat
```
$ docker run --name lab-tomcat -d -p 8888:8080 tomcat:9.0.64-jdk8-corretto
$ docker exec lab-tomcat cp -avT ./webapps.dist ./webapps
$ docker cp ./tomcat/tomcat-users.xml lab-tomcat:/usr/local/tomcat/conf
$ docker cp ./tomcat/context.xml lab-tomcat:/usr/local/tomcat/webapps/manager/META-INF
```
http://192.168.64.3:8888/

tomcat/s3cret
```
$ docker run --name lab-tomcat-11 -d -p 8888:8080 tomcat:9.0.64-jdk11-corretto
$ docker exec lab-tomcat-11 cp -avT ./webapps.dist ./webapps
$ docker cp ./tomcat/tomcat-users.xml lab-tomcat-11:/usr/local/tomcat/conf
$ docker cp ./tomcat/context.xml lab-tomcat-11:/usr/local/tomcat/webapps/manager/META-INF
```
```
$ docker run --name lab-tomcat-17 -d -p 8888:8080 tomcat:9.0.64-jdk17-corretto
$ docker exec lab-tomcat-17 cp -avT ./webapps.dist ./webapps
$ docker cp ./tomcat/tomcat-users.xml lab-tomcat-17:/usr/local/tomcat/conf
$ docker cp ./tomcat/context.xml lab-tomcat-17:/usr/local/tomcat/webapps/manager/META-INF
```

### Java + Payara
[Payara Docker Images](https://www.payara.fish/downloads/payara-docker-images/)
```
$ docker run --name lab-payara-11 -d -p 8080:8080 -p 4848:4848 payara/server-full:5.2022.2-jdk11
```
https://192.168.64.3:4848/common/index.jsf

admin/admin

To deploy the app, go to Applications --> Deploy --> select demo.war file (at java/demo/target), and hit Ok.

http://192.168.64.3:8080/demo/resources/hello

### Java + WildFly
[WildFly Docker Images](https://quay.io/repository/wildfly/wildfly)
```
$ docker run --name lab-wildfly -p 8080:8080 -p 9990:9990 -d quay.io/wildfly/wildfly:26.1.1.Final /opt/jboss/wildfly/bin/standalone.sh -b 0.0.0.0 -bmanagement 0.0.0.0
```

http://192.168.64.3:8080/

### Apache
```
$ docker run -d --name lab-apache -p 8080:80 httpd:2.4.54-alpine
http://192.168.64.3:8080/

$ docker cp ./apache/index.html lab-apache:/usr/local/apache2/htdocs/
// only needed if you are using minikube
$ minikube mount $PWD:/tmp/lab
$ docker run -d --name lab-apache-live -v /tmp/lab/apache:/usr/local/apache2/htdocs -p 8080:80 httpd:2.4.54-alpine
```
Every change made to the folder will be reflected with a browser refresh.

### Nginx
```
$ docker run -d --name lab-nginx -p 8080:80 nginx:1.23.1
$ docker cp ./nginx/index.html lab-nginx:/usr/share/nginx/html/
$ docker run -d --name lab-nginx-live -v /tmp/lab/nginx:/usr/share/nginx/html -p 8080:80 nginx:1.23.1
```

## Build your own - demos
### Node.js
```
$ cd node
$ docker build -t dev-node:1.0.0 .
$ docker run -d --name lab-node -v /tmp/lab/node/src:/app/src -p 8080:8080 -e PORT=8080 dev-node:1.0.0
```
http://192.168.64.3:8080/health
```
$ docker logs -tf lab-node
```
http://192.168.64.3:8080/

### .NET Core
```
$ cd dotnet
$ docker build -t dev-dotnet:1.0.0 .
$ docker run -d --name lab-dotnet -p 8080:80 dev-dotnet:1.0.0
```
http://192.168.64.3:8080/greeting

### Go
```
$ cd go
$ docker build -t dev-go:1.0.0 .
$ docker run -d --name lab-go -v /tmp/lab/go:/app -p 8080:8080 dev-go:1.0.0
```
http://192.168.64.3:8080/hello

### Python (Flask)
```
$ cd python
$ docker build -t dev-python:1.0.0 .
$ docker run -d --name lab-python -p 8080:5000 dev-python:1.0.0
```
http://192.168.64.3:8080/hello

### Ruby (Sinatra)
```
$ cd ruby
$ docker build -t dev-ruby:1.0.0 .
$ docker run -d --name lab-ruby -p 8080:4567 dev-ruby:1.0.0
```
http://192.168.64.3:8080/hello

### PHP
```
$ cd php
$ docker build -t dev-php:1.0.0 .
$ docker run -d --name lab-php -p 8080:80 dev-php:1.0.0
```
http://192.168.64.3:8080/info.php

Search for ``pdo`` and it should only show pdo_sqlite.

Uncomment this line in the Dockerfile to install pdo_mysql extension and check phpinfo again.
```
#RUN docker-php-ext-install pdo_mysql
```
```
$ docker rm -f lab-php
$ docker build -t dev-php:1.0.0 .
$ docker run -d --name lab-php -p 8080:80 dev-php:1.0.0
```
It will show pdo_mysql enabled.

### Docker Compose
```
$ cd compose
$ docker-compose up -d
```
Frontend URL:
http://192.168.64.3:8080/

RabbitMQ console: http://192.168.64.3:15672/

user/password

MongoDB Express: http://192.168.64.3:8081/

Open multiple terminals to have visualization on each container
```
$ docker logs -tf compose-frontend-1
$ docker logs -tf compose-backend-1
$ docker logs -tf compose-subscriber-1
$ docker logs -tf compose-rabbitmq-1
```
Place a couple of orders and watch the logs.

Watch RabbitMQ and MongoDB console.
```
$ docker-compose down
```
`docker-compose` up command will build the containers if they don't exist. If you have any change and run docker-compose up again, it won't build the container because it is found. To trigger the build you have to add `--build` flag.