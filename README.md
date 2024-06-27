Weichselgartner, Max 00805365

Taieb, Sami 00803933

integreat-app Passau


# Project Description
Integreat App for the City of Passau (Dailylife)

This project is a full-stack web application implemented with Next.js and MongoDB. 
The app is designed to facilitate the integration of immigrants by providing valuable information and resources. The main focus of the website is the dailylife and living category, where users can access various articles related to this topic.

## Features:
1. **Dailylife and Living Section:**
   - Users can explore a variety of articles covering topics related to dailylife and living.

2. **FAQ Forum:**
   - Not logged-in Users can explore asked questions in the FAQ forum.
   - Logged-in users can ask and answer questions.

3. **News and Events:**
   - Users can stay informed about the latest news and upcoming events relevant to Passau.   
  
4. **Multilingual Support:**
   - The website is available in two languages, German and English, to cater to a diverse user base.
   - Note: FAQ, News and Events only avaible in one language

5. **User Authentication:**
   - User authentication allows individuals to create accounts and log in.
   - Note: Session is made with cookies (not that save!)

6. **User Roles:**
   - **Regular Users:**
     - Can view articles, news, and events.
     - Can view questions in the FAQ forum but cannot ask or answer questions.
   - **Logged-in Users:**
     - Have the same privileges as regular users.
     - Can post questions in the FAQ forum and respond to others.
   - **Admins:**
     - Have full control over the content.
     - Can edit articles.
     - Can create and delete news and events.
     - Can manage questions and answers in the FAQ forum.


# Prerequisites
Ensure the following software versions are installed:

- NodeJS [v20.10.0]
- MongoDB [v6.3.0]
- MongoDBCompass for easier data import

# Installation
1. Clone the repository: `git clone https://mygit.th-deg.de/mw26365/testing-projekt-mit.git`
2. If needed, navigate to the project directory: `cd testing-projekt-mit`
3. Install dependencies: `npm install`
4. Create a `.env.local` file in the root directory and add the following content:

```env
MONGODB_URI = "mongodb+srv://<name>:<password>@atlascluster.bsgw2nq.mongodb.net/"
DB_NAME = "sampleDB"

DEV_URL = "http://localhost:3000/de"

PROD_URL = ""
```

Replace the `MONGODB_URI` string with your MongoDB Atlas cluster string (see Database setup) and replace `<name>` and `<password>` with your credentials.

5. Start the application: `npm run dev`
6. Open "http://localhost:3000/en" to see the webpage

## Database setup
1. Create (if needed) an Account on MongoDB (https://www.mongodb.com/de-de) and follow the given instructions. Then you should get to the mongoDB Atlas
2. Create a new cluster.
3. Press "Connect" and follow the given instructions when connecting via MongoDBCompass. 
4. Open MongoDBCompass and connect with your connection-string and credentials
   - Make sure to add your IP-Adress to Network Access 
5. Create the databases based on the uploaded filenames in the folder "database-files". 
   - E.g. (articles.allArticles.json) => create Database called "articles" with the collectionName "allArticles".
6. Your structure should look like this (without admin, config and local): 
-  ![databasestructure](/uploads/daf52048d888d311963aeb7ff582bf26/databasestructure.png)   
7. Add in the collection the corresponding file via the Button "add Data" -> "import json"

# Basic Usage
1. Install and run the application as shown above.
2. Visit the website on "http://localhost:3000/en" and explore articles, news, and events.
   - Note: The categories "Welcome" and "Health" in Local informations are just for decoration and have no functionality.
3. Create an account and log in to access additional features like ask questions in the FAQ forum or answer existing questions.
4. Admin-Users can manage content (edit articles, create/delete news and events) and can delete user-asked question or answers in the FAQ-Forum.

## Default User Accounts:
- **User Account:**
  - Username: user
  - Password: user

- **Admin Account:**
  - Username: admin
  - Password: admin

## Possible Errors
- **No data shown:** 
   - If you can´t see any information in Dailylife, News, Events or FAQ then your database connection doesn´t work properly. 
   - Make sure that you have set up the database correctly and created an ".env.local" file in the root directory

# Implementation of the Requests
To meet the technical requirements, the project has been implemented with the following features:

1. **The full stack App must be completely written in TypeScript:**
   - The entire application is written in TypeScript. Frontend and backend.

2. **In the frontend React must be used:**
   - The frontend is developed using React with NextJs.

3. **In the backend Next.js must be used:**
   - The backend is built with Next.js.

4. **There must be a database connection. The database system must be MongoDB:**
   - The app establishes a connection to a MongoDB Atlas Cluster database in the database.ts file in the /lib/mongo directory.

5. **A logger like Pino must be used to print information, e.g. about data sent between Front- and Backend:**
   - We used the normal console.log to show Login/Registration-Information or Information about the Success of saving article-Data.

6. **The app must be easy to configure (e.g. the database connection) and extend (e.g. add a new feature):**
   - We used a .env.local file to store the database connection string. The database setup is more complicated. The app works with the NextJs app-directory and can therefore be easily extended by adding new pages and components in the lang folder for the frontend. Or by adding new routes to the api folder for the backend communication. 

7. **There must be a user friendly maintenance on the backend:**
   - We tired to use best-practices and to use the same naming conventions for components and functions. Everything is commented for better understanding.

8. **The Corporate Identity of THD/DIT must applyed.:**
   - The Corporate Identity of THD/DIT is applied to ensure a consistent and professional appearance. We used the THD font-familys, font-sizes and line-heights. We also used the given THD colors in suitable places. The THD-facility-bubbles are used in the footer and on the loading-component. 

9. **It must be multi-language, at least German and English (switchable):**
   - The app supports multiple languages, including German and English. The language can be changed by clicking on the globe-icon in the navbar. 

10. **It must use a CSS framework, either one of Tailwind, Bootstrap or Material Design (Ionic components may be used):**
      - We used tailwindcss for the styling and predefined some colors in the tailwindcss.config.js file.

11. **The app must be usable on mobile phones (Android, IOS) and PC (responsive design):**
      - The application is responsive and usable on both mobile phones (Android, IOS) and PCs with various display sizes.

12. **It must be separated into 2 areas:**
      - The app is separated into three areas:
         - Unregistered Area: Accessible to users without the need for registration and login.
         - Registered Area: Requires user registration and login to ask or answer a question in the FAQ-Forum.
         - Admin Area: Requires an admin user to edit or delete different content.

# Work Done
Throughout the project, we worked together on the entire project most of the time via Discord. The division of tasks therefore overlaps considerably. However, the following division comes closest to our project.

**Frontend Development (Max):**
   - User login/registration
   - Displaying articles in the "Dailylife" section
   - Displaying news in the "News" section
   - Visualizing FAQ Forum
   - Header components (informationbar)
   - Multilingual support

**Frontend Development (Sami):**
   - Displaying news in the "News" section
   - Displaying events in the "Events" section
   - Header components (navbar)
   - Multilingual support   

**Backend Development (Sami):**
   - Setup of MongoDB database
   - MongoDB connection
   - database functions

**Backend Development (Max):**
   - API Routes 
   - database functions  
   
**Configuration and Structure (Max & Sami):**
   - Defined the application structure to be easily extended by adding new pages, components, and routes in the right places

**Styling and Corporate Identity (Max):**
   - Styling the user interface
   - THD's corporate identity
   - Dark-Mode

**Styling and Corporate Identity (Sami):**
   - Styling the user interface
   - THD's corporate identity  

**Responsive Design (Max & Sami):**
   - Ensured the application is responsive and user-friendly on various devices

**Documentation (Max & Sami):**
   - Creating the Readme file and the Wiki   
