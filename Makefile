npm_reinstall:
	docker-compose down
	docker volume rm appsample_node_modules
	docker-compose up --build
