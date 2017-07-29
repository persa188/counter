docker build . -t sanic/counter
docker create \
  --name=counter \
    -p 7978:3000 \
  sanic/counter
