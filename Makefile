npm_reinstall:
	docker-compose down
	docker volume rm sml-exporter_node_modules
	docker-compose up --build
