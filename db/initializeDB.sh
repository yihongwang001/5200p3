#!/bin/bash

mongoimport -h localhost:27017 -d artGallery -c artworks --drop --jsonArray ./db/artworks.json
mongoimport -h localhost:27017 -d artGallery -c artists --drop --jsonArray ./db/artists.json