.PHONY: build start startstage startprod stop restart sh logs config test lint promote

container=pdf-decryptor-frontend

# \
!ifndef 0 # \
wait_for_input=pause # \
!else
wait_for_input=read
# \
!endif

# build the app container
build:
	docker compose build

# start all the containers
start:
	docker compose -f docker-compose.yml up -d

startstage:
	docker compose -f docker-compose.yml -f docker-compose-stage.yml up -d

startprod:
	docker compose -f docker-compose.yml -f docker-compose-prod.yml up -d

# stop all the containers
stop:
	docker compose down

# restart containers
restart: stop start

# get a shell within the app container
sh:
	docker compose exec $(container) /bin/sh

# check console output
logs:
	docker compose logs -f $(container)

# show the combined compose file used
config:
	docker compose config

# run tests
test:
	docker compose exec -T $(container) npm test

# lint code
lint:
	docker compose exec -T $(container) npm run lint

promote:
	echo "Make sure master/production branch is up-to-date! And what you are about to deploy is already on staging! Hit [ENTER] to continue"
	$(wait_for_input)
	git checkout production
	git rebase main
	git push
	git checkout main
