# Prerequisites

## Packages installation

To be able to execute this repository first of all you need to install the dependencies with the following command
`npm i`

## Environment variables

This repository use some environment variables to be able to work properly. Create a '.env' file and fill the proper values using the file '.env.example' as a base.

| Variables      | Description                        | Example   |
| -------------- | ---------------------------------- | --------- |
| EXPRESS_PORT   | Port the express app will use      | 3000      |
| DB_HOST        | Host of the postgres database      | localhost |
| DB_PORT        | Port of the postgres database      | 5432      |
| DB_NAME        | Name of the postgres database      | postgres  |
| DB_USER        | User of the postgres database      | postgres  |
| DB_PASSWORD    | User of the postgres database      | postgres  |
| JWT_SECRET_KEY | Key used by jwt to sign new tokens | 123456    |

## Database

Last but not least ensure you have the database server started. To facilitate this, a docker compose file has been created to start an instance of a PostgreSQL database in case you have docker installed on your computer. Write the following command to start the dockerized instance.
`docker compose up`

This command not only starts a postgres database, but also inserts a user directly so the user can start to work directly with the API.

**A user needs to be created previously on the database to be able to work with the api as every endpoint, except login requires to be authenticated**. It's recommended using the docker compose previously mentioned, as an alternative you can execute the following insert statement:

    INSERT INTO users (name, email, password) VALUES ('admin', 'admin@admin.com', '$2b$10$PqLV.OPh6p.GAqoUP7g0X.DhRWPPtirlhaU7uWjkvED9rMovFtsd2');

This statement creates the following user credentials:

    user: admin@admin.com
    password: password1

# Use of the application

A RESTful API has been developed for handling user operations. However, as all these operations are securized using JWT tokens, a separate endpoint called /login has been created to generate a token before hand. **Once a token has been generated, it needs to be inserted as a bearer token on the authorization header**

## Login

To be able to login use the following endpoint:

### Login

    POST /login

| Parameters | Description                                  |
| ---------- | -------------------------------------------- |
| email      | Email of the user we want to get a token for |
| password   | Plain text password for the previous user    |

Returns (JSON)
|Parameter| Description |
|--|--|
| token | JWT token to be used on the following request |

## User CRUD

### Create

    POST /users

| Parameters | Description                               |
| ---------- | ----------------------------------------- |
| email      | Email of the user                         |
| name       | Name of the user                          |
| password   | Plain text password for the previous user |

Returns (JSON)
|Parameter| Description |
|--|--|
| id | Id of the user created |
| name | Name of the user created |
| email | Email of the user created |

### Read

    Get /users/:id

Returns (JSON)
|Parameter| Description |
|--|--|
| id | Id of the user created |
| name | Name of the user created |
| email | Email of the user created |

### Update

    PATCH /users/:id

| Parameters | Description                                          |
| ---------- | ---------------------------------------------------- |
| email      | (Optional) Email of the user                         |
| name       | (Optional) Name of the user                          |
| password   | (Optional) Plain text password for the previous user |

Returns (JSON)
|Parameter| Description |
|--|--|
| id | Id of the user created |
| name | Name of the user created |
| email | Email of the user created |

### Delete

    DELETE /users/:id

Returns (JSON)
|Parameter| Description |
|--|--|
| id | Id of the user created |
| name | Name of the user created |
| email | Email of the user created |

# Test

Some tests using jest have been generated to test the api. You can run the following command to execute them:

    npm run test
