
# Youtube Data Extractor

<a href="https://ytoutube-video-extracter.onrender.com/"> 🚀 DEMO LINK </a>

This project is build using NodeJS and react.

- The backend of the project extracts the data about some given words and in interval of 10 secoends it inserts that data into the postgres database. 
- Copy the .example.env to .env and specify your own creds to run. The example creds may not work.
- The project is also on docker build the docker file.

### Working
- /search has params with which it returns the paginated data
  - params{perPage,page,search,id}
- In the frontend you can click on the page number to go to specific page and enter the search text
- The backend calls the Youtebe Data API in every 10 sec for a predefined set of words and populate the database.
- It also rotates the API Key if the fetch limit is exhausted for th

### Tech stack

- Languages: HTML, CSS, JavaScript
- Sequelize ORM
- Postgres database
- Tailwind CSS 
- NodeJS 



### To Run the Project
- npm run build : this will build the FE and put it in the public accessable directory of the backend 
- npm start 

- To run the Frontend Separately 
    - npm run build : inside fe/my-app
  
  
  
![Screenshot_2023-02-04_10_55_20](https://user-images.githubusercontent.com/42701850/216750512-2d5436e6-f297-4647-91f6-7bc9213f4827.png)
