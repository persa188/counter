docker build . -t sanic/counter 
docker create \
  --name=counter \
    -p 7878:3000 \
  sanic/counter
