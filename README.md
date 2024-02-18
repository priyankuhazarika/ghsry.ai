# ghsry.ai

Make sure you have Node.js 20 installed. Then run `corepack enable`, this will make Yarn available on your system. Then navigate to the root of the project and run `yarn` to install all the dependencies.

Setup a MySQL 8 server and create a new database in it. Next create a `.env` file inside `app/backend` and put the following content:

```
DATABASE_URL=mysql://[username]:[password]@[hostname]:[port]/[database_name]
```

Make sure to replace the placeholders with appropriate values.

Then run `yarn migration:run` to run the migrations which will create all the necessary tables, constraints, and indexes.
