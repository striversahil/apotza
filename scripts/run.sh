# to Execute this script type "bash run.sh" in terminal


# Install redis and run it
docker run --name redis -p 6379:6379 -d redis

# Connect to redis
docker exec -it redis redis-cli


npm run dev


