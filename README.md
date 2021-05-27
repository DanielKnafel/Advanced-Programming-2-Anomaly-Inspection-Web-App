# Advanced-Programming-2-Anomaly-Inspection-Web-App
## Introduction
In this project we support two user stories that both of them returns anomaly inspection report:
1) The user opens his browser with the url localhost:8080.
   He gets a website with options to upload train csv file and anomaly csv file.
   After uploading and press submit, he gets the results in the output window.
   The results contain anomaly inspection report.
2) The user sends HTTP POST command to the url localhost:8080 with algorithm, train csv file and anomaly csv file.
   The server returns a response to the user in a JSON that includes the anomaly inspection report.
## Video link

## Explanation of folders and main files structure

## Preinstallation for Developer
IDE (we used Visual Studio Code)
install npm
install node.js

## Quickstart: Installations Instructions And Running
System requirements: 
web browser

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

