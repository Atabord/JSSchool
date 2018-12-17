# Challenge C10
## Real time integration

* Add web socket integration in your frontend application
* Add support in the backend app for use websockets
* Build a real time visual feedback when a book is reserved and emit to all clients the book availability 
* Add reactive programming to your interfaces to make more fuid design and response in actions
* Push all your changes into the github repo

## How to Install and use the API
### prerequisites
  * clone the repository
  * Install the dependencies:
    ```
        npm install
    ```
  * Set your own environmental variables in the file .env
  * download MongoDB, install it, open a terminal and run:
    ```
        mongod
    ```
  * To autofill the database:
    ```
      cd back-end
      npm run populate
    ```

  * Preparing the environment: 
  
    open .env file and change the values when required, the environment is already set with default values for developers
  
  * Run the project with:
    ```
        npm start
    ```

## Using the api

### Populating MongoDB
#### Automatically
  ```
    npm run populate
  ```
  Please be sure you don't have any user1 or user2 created on the bookshelf database or this command will throw errors

#### Manually

    Call `/books/new` with Post method and the next body:

| key   | value |
| ----- | ----- |
| isbn  | [Find the isbn of your favorite book here](https://isbnsearch.org/) |
| place | Can be Quito, Cartagena, Medellin, Digital or Personal_Loans |
| copies | Number (e.g. 3) |


### Get All the books
    Call `/books` with Get method and your token in the header info.

### Get All the books in a specific bookShelf
    Call `/books?bookShelf=[bookshelf wanted]` with Get method and your token in the header info.

### Get one book
    Call `/books/[book id]` with Get method and your token in the header info.

    That id is specified in the returned json, you can find them while getting all the books

### Lend a book
    Call `/books/[book id]/lend` with PATCH method and your token in the header info.

 * I decided to make it with PATCH method because when you have rented it, the available copies will be reduced by one
 * You can't lend a book with no available copies unless it is digital

### Sign In
    Call `/users/signIn` using post and bringing information as follows:

| key   | value |
| ----- | ----- |
| username | your created username |
| password | your created password |


 # Front-end

Now that you have your back-end ready, you can run the front-end as follows:

Note: don't forget to keep running the back-end 

## Running the app
```
cd ../front-end
```
Go to front-end folder and run this command:
```
  npm start
```
This command will compile the sass files, run the webpack tasks and start the webpack server.

Open http://localhost:8081/ in your favorite browser to watch the app runing.

The users created by auto-populating the database are:
| user | password | email |
|------ |-------- | ------ |
| user1 | password1 | user1@example.com |
| user2 | password2 | user2@example.com |

You can use them to login on the app, or create your own users using curl or postman.
