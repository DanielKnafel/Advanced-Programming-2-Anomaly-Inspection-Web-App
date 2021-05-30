# Advanced-Programming-2-Anomaly-Inspection-Web-App
## Introduction
In this project we developed a web inspection app, implementing 2 user stories:

*First User Story* 

A user connect to localhost:8080 using his perferred web browser, and is greeted with a GUI. The user chooses an algorithm from the drop-down table and selects a **train csv file** to train the model, and a **test csv file** to detect anomalies according to the correlations found in the train file and hits **Submit**.
The data is sent to server, and after it has been proccessed, the detected anomalies (if any were found) are displayed on web-page.

*Second User Story* 
A user sends an HTTP POST request to localhost:8080 that includes an algorithm, train csv file and an anomaly csv file.
   The server responds with a JSON including the anomaly inspection report for given files.
## Video link
https://www.youtube.com/watch?v=MGTpONC_lAU

## Explanation of folders and main files structure
   └── Advanced-Programming-2-Anomaly-Inspection-Web-App
       ├── AnomalyDetectionServer
       │   └── AnomalyDetectionServer
       └── WebServer
           ├── controller
           │   └── server.js
           ├── model
           │   └── model.js
           ├── storyTwo
           │   └── storyTwo.py
           └── view
               └── index.html

** Please note - this project is meant to be run on **Linux** **

## Preinstallation instructions for Developer
1. Your IDE of choise (we used Visual Studio Code).
2. node.js (version 12 or later).
3. npm (Node Package Manager).
4. python 3.

Installation instructions for node.js and npm:
   In a terminal, run the following commands:
      * *sudo apt-get update*
      * *sudo apt-get install nodejs*
      * *sudo apt-get install npm*

Make sure the installation finished successfully by running:
   * nodejs -v
   * npm -v (make sure you have Node version 12 or newer)
   
Now, navigate to the folder */WebServer/controller* (make sure the package.json file exists in there), and run:
   * npm -i
to install the required node packages.

## Quickstart:
**How to run the program:**
1. In a terminal, navigate to *AnomalyDetectionServer/* and compile the c++ files by running:
   *g++ -std=c++11 -pthread *.cpp -o AnomalyDetectionServer*
   or use the provided *cmakelists.txt* with *cmake* on VS Code.
2. Run the executable, by running:
   *./AnomalyDetectionServer*
3. Navigate to */WebServer/controller* and start the web-server by running:
   *node server.js*
4. Run the provided *storyTwo.py* file to check user story 2, or open a web browser at *localhost:8080* to check user story 1.

## Links
In our project we used MVC architecture in order to make everything work.

### MVC

![MVC](https://raw.githubusercontent.com/DanielKnafel/Advanced-Programming-2-Anomaly-Inspection-Web-App/main/Images/MVC.png)

The MVC architectural pattern in web application is divided to three parts:
View: responsiple for the visual display of the data to the user.
Controler: manages between the View and the Model.
Model: contains the algoritim to proccess the data for displaying.
The order of the communication between the client and the web application:
1) The client request http request from the Controler.
2) The Controler pass the request to the Model.
3) The Controler generates presentation for the View.
4) The View gets the state from the Model.
5) The View returns the HTTP response to the client.

### Flow

![Flow](https://raw.githubusercontent.com/DanielKnafel/Advanced-Programming-2-Anomaly-Inspection-Web-App/main/Images/Flow.png)

