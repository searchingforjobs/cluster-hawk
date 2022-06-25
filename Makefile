run:
	docker run -p 80:5000 --name clusterhawk shuimi/cluster-hawk
build:
	docker build -t shuimi/cluster-hawk .
push:
	docker push shuimi/cluster-hawk
rm:
	docker rm clusterhawk
stop:
	docker stop clusterhawk
up:
	docker-compose up --build
cleanup:
	docker-compose down -v
