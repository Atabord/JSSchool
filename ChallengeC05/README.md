# Challenge CO5
## Homepage for the final project

* Interact with the API for books which provide information of the books
* Use the endpoint: https://www.googleapis.com/books/v1/volumes?q=isbn:9781451648546, to get book information
* Create the model in JSON file to use as mocked data
* Start building the main layout for the site in a normal index.html file using SCSS and js to get the first prototype of the app with mocked data
* Create homepage of the bookstore app
* Create book preview page
* Create reservation process interface
* Finally, add into your GIT repo and push all the new elements

## How I did that?
During this week generated a layout in HTML and SCSS completely responsive with a little interactivity made with jQuery.
This interactivity help the page showing some pupups and navigation menu as bellow:
![Image of how popup looks like](images/bookshelf-popups.png "Image of popup")
![Image of how dropdown looks like](images/bookshelf-dropdown.png "Image of dropdown")

## Note: Ajax calls will only works using a server, so I used VS live-server plugin while developing the project

## How to run it?
Before running the web app, please be sure to follow the next commands:
* To compile sass:
    * install sass an then use the next command on the principal directory
        ```
            sass sass:css
        ```
* To install npm dependencies:
    * Download and install node
    * In the current directory run the next command
        ```
            npm install
        ```
* To run ESlint
    ```
        npm run lint
    ```

* To run live-server:
    ```
        npm run server
    ```
    

## Watch it runing in your device:
https://atabord.github.io/JSSchool/ChallengeC05/


