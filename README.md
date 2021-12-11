## cs5200-project-3

<h1 align="center">Art Gallery Management System
  <br>
  by Jiayi Ning & Yihong Wang
  <br>
</h1>

### instuctions to import database and run application

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

### Description of the requirements of the problem and list of business rules and possible nouns and actions

https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/Business%20Requirements.pdf

### Conceptual model in UML

![Image of UML](https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/Project1%20-%20ERD.png?raw=true)

### Logical data model in ERD

![Image of ERD](https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/Project1%20-%20ERD.png?raw=true)

### Relational schema

https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/Relational%20Schema.pdf

### SQL data definition statements

https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/project1_db.sql

### Showing the tables were created and conform to the constraints through screen shots

![Image of screenshots](https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/Project1%20-%20screenshots.png?raw=true)

### SQL with test data

https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/project1_queries.sql

### SQL with query statements

https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/project1_queries.sql

### Whole database

https://github.com/lilning/cs5200-project-1/blob/main/Project%20Part%201/P1.db
