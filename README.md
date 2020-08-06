Overview
---
Article Insight is a web application providing various analytics about Wikipedia articles and their associated revisions. These analytics can be divided into three categories: overall (capturing statistics across all the revisions in the database - e.g. which article has the most revisions), article-specific (capturing statistics relevant to a particular article - e.g. for article ‘Australia’, who made the most revisions in total) and author-specific (capturing statistics relevant to a particular author - e.g. for an author, show me a list of all revisions made by them). All statistics are generated in real time based on the information currently available in the database. In order to access this information, users must either register an account or login via an already registered account. 

Step-by-step instructions
---
1. After downloading the master-folder from the GitHub repository, extract it to a directory of your choice.
2. Open up Terminal (if you’re using Mac/Linux) or Command Prompt (if you’re using Windows)
3. Navigate to the server folder (by typing cd filepathtoDIR/Web_dev_4-master/server where DIR is the directory you extracted to).
4. Type the following commands: 
  - npm install
  - npm install -g nodemon 
  - npm run dev.
5. Open another terminal window and navigate to the client folder (/client instead of/ server in the cd command) and type the same 3 commands as for the server. 
6. Type localhost:4200 in the browser to access the site.
