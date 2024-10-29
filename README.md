MINDARC_Product is a simple api for fetching a product from a third-party API and populating a new database.

## Features/Endpoints
  * GET products
    - Retrieves records from a third party API and saves into the database
    - Returns a response message
  
  * POST products
    - Retrieves records from a third party API and saves into the database
    - Returns a response message and a JSON

  * DELETE products
    - Removes a record using an ID from the database
    - Returns a response message

  * PUT products
    - Updates all product titles with appended SKU
    - Returns a response message

## Technologies used
  * NodeJS
  * Express JS
  * Typescript
  * Drizzle ORM
  * Neon postgres

## Installation
  * Clone the repository
    - git clone https://github.com/Darrius-Me/backend-assessment-js.git
  
  * Navigate to project directory
    - cd [directory]
  
  * Install the required dependencies
    - npm install
  
  * Create and configure env variables
    * Create a .env file in the root directory and add the following variables:
      * PGHOST='[database_host]
      * PGDATABASE='[database_name]'
      * PGUSER='[database_user]'
      * PGPASSWORD='[database_key]'
      * PORT='[port_number]'

## Usage
  * Compile TypeScript files into JavaScript
    - npx tsc

  * Generate SQL for postgres migration
   - npm run db:generate

  * Push the generated SQL to be executed in the database
   - npm run db:push

  * Run NodeJS with the compiled JavaScript
   - node dist/index.js