**Torochallenge Project**
======================

Welcome to the Torochallenge project!

This project is built using Laravel, Laravel Breeze, Inertia, and React. It utilizes Laravel Sail to run the application in Docker.

**Getting Started**
-------------------

### Step 1: Install Dependencies

* Run `composer install` to install the PHP dependencies.
* Run `npm i` to install the Node.js dependencies.

### Step 2: Start Docker Containers

* Run `./vendor/bin/sail up` to start the Docker containers.

### Step 3: Migrate Database

* Run `./vendor/bin/sail artisan migrate` to run the database migrations.

### Step 4: Seed Database

* Run `./vendor/bin/sail artisan db:seed` to seed the database with sample data.

### Step 5: Start Development Server

* Run `./vendor/bin/sail npm run dev` to start the development server.

**Default Credentials**
---------------------

The default email and password for the application are:

* Email: test@example.com
* Password: toroChallenge