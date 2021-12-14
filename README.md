## cs5200-project-3

<h1 align="center">Art Gallery Management System
  <br>
  by Jiayi Ning & Yihong Wang
  <br>
</h1>

## Instuctions to import database and run application

1. connect to your mongodb with localhost:27017

2. clone the repo

3. inside the repo folder, bash import the file using below mongoimport command:

> mongoimport -h localhost:27017 -d artGallery -c artworks --drop --jsonArray ./db/artworks.json

> mongoimport -h localhost:27017 -d artGallery -c artists --drop --jsonArray ./db/artists.json

4. populate data in redis

(artwork part): node loadingArtwork

5. run: npm install

6. run: npm start

7. check localhost:3000

## Problem requirements

https://github.com/yihongwang001/5200p3/blob/main/tasks1-2/Business%20Requirements.pdf

## Conceptual model in UML

![image](https://github.com/yihongwang001/5200p3/blob/main/tasks1-2/UML.png?raw=true)

## Functionalities that you selected to be used as an in-memory key-value storage

### Artwork part:

artworkID, artistID, name, year, movement, status

## Describe the functionalities that you selected to be used as an in-memory key-value storage

### Artwork part:

1. store data in sets in the form: key:{artwork:artworkID}, value:{artworkID, artistID, name, year, movement, status}

2. store artworkIDs in a list in the form: key:{artwork}, value:{artwork:artworkID}
