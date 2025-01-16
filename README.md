# Scribbles Blog Application

An implementation of a blogging platform where users can post about their interests, daily life, and etc.

This project uses Vite as a build tool and development server for React and a local database (PostgreSQL) which requires a local database setup.

## Prerequisites

You will need the following installed on your computer:

- [Node.js](https://nodejs.org/en) (with npm)
- [PostgreSQL (pgAdmin should be installed along with this)](https://www.postgresql.org/download/)

## Setup/Installation

### Database setup

Make sure you have pgAdmin and PostgreSQL installed

In pgAdmin:

1. Create a new Database called `scribbles`.
2. Right click `scribbles` and select `Query Tool`.
3. Copy and paste the following code to the Query:

   ```
   CREATE SEQUENCE IF NOT EXISTS posts_id_seq
     START WITH 1
     INCREMENT BY 1
     NO MINVALUE
     NO MAXVALUE
     CACHE 1;

   CREATE TABLE IF NOT EXISTS public.posts
   (
       id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
       username character varying(45) COLLATE pg_catalog."default",
       title text COLLATE pg_catalog."default",
       content text COLLATE pg_catalog."default",
       date_posted date,
       edited boolean NOT NULL DEFAULT false,
       CONSTRAINT posts_pkey PRIMARY KEY (id)
   )

   TABLESPACE pg_default;

   ALTER TABLE IF EXISTS public.posts
       OWNER to postgres;

   ```

4. You can check if the `posts` table has been correctly created following this path: `scribbles>Schemas>Tables>posts`

### Cloning and running app

- `git clone <repository-url>`
- `cd Scribbles-Blog-Application`
- To run the frontend:
  ```
  cd client
  npm run dev
  ```
- In the backend:
  ```
  cd server
  npm run start
  ```
- A link will be generated to localhost (ex: http://localhost:5173)
- Follow the link and you will be able to interact with the website!

## Running Tests

You can run the frontend tests (vitest) by:

- `cd client`
- `npm run test`
