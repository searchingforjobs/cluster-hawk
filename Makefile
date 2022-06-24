run:
	docker run -p 80:5000 --name nesttemplate shuimi/nest-template
build:
	docker build -t shuimi/nest-template ./docker/prod
push:
	docker push shuimi/nest-template
rm:
	docker rm nesttemplate
stop:
	docker stop nesttemplate
up:
	docker-compose up --build
cleanup:
	docker-compose down -v
