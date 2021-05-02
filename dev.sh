# !/bin/bash
docker run -it --rm -p 3000:3000 -v "$PWD":/usr/src/app -w /usr/src/app --name huesec-co huesec-co-node-app yarn dev 