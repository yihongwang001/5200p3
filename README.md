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

> run: node db/loadingArtwork.js

> run: node db/loadingArtists.js

5. run: npm install

6. run: npm start

7. check localhost:3000

## Problem requirements

https://github.com/yihongwang001/5200p3/blob/main/tasks1-2/Business%20Requirements.pdf

## Conceptual model in UML

![image](https://github.com/yihongwang001/5200p3/blob/main/tasks1-2/UML.png?raw=true)

## Collections in NoSQL database

![image](https://github.com/yihongwang001/5200p3/blob/main/tasks1-2/Collections.png?raw=true)

## Functionalities that you selected to be used as an in-memory key-value storage

### Artwork part:
Showing, creating and updating the following information of artworks:
artworkID, artistID, name, year, movement, status

### Artwork part:
Create, Read, Update, Delete Functionalities for the following information for artists. I want to display the following information in a list for users to easily access:
artistID (cannot update), name, birth year, death year, nationality, region, description

## Describe the functionalities that you selected to be used as an in-memory key-value storage

### Artwork part:

1. Used hash to store each artwork detail information in this form: key:{artwork:artworkID}, value:{artworkID, artistID, name, year, movement, status}

2. Used list to store all the artworkIDs in this form: key:{artwork}, value:{artwork:artworkID}

**Here are examples for redis key-value storage in artwork part：**

![image](https://github.com/yihongwang001/5200p3/blob/main/tasks1-2/RedisExampleArtwork.png?raw=true)

### Artists part:

1. Used the list data structure to store all artist names in the form: key:artists value:{artist:name}

2. Used the hash data structure to store artist details by artist name in the form: key:{artist:name}, value:[{nationality:value}, {name:value}, {birthYear:value}, {deathYear:value}, {id:value}, {region:value}, {description:value}]
