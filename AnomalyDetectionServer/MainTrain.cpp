/*
 * run2.cpp
 *
 *  Created on: 8 ����� 2019
 *      Author: Eli
 */

#include <iostream>
#include <fstream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <pthread.h>
#include <thread>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include "Server.h"

using namespace std;

void writeStr(string input,int serverFD){
	write(serverFD,input.c_str(),input.length());
	write(serverFD,"\n",1);
}

string readStr(int serverFD){
	string serverInput="";
	char c=0;
	read(serverFD,&c,sizeof(char));
	while(c!='\n'){
		serverInput+=c;
		read(serverFD,&c,sizeof(char));
	}
	return serverInput;
}

Server *GlobalServerPtr;

void exitHandler(int sigNum){
	cout<<endl;
	cout<<"atExit"<<endl;
	GlobalServerPtr->stop();
}

int main(){
	int port=5555;

	try{
		AnomalyDetectionHandler adh;
		Server server(port);
		server.start(adh); // runs on its own thread
		// stop the server on ctrl-c
		GlobalServerPtr = &server;
		struct sigaction sact;
		sigemptyset(&sact.sa_mask);
		sact.sa_flags = 0;
		sact.sa_handler = exitHandler;
		sigaction(SIGINT, &sact, NULL);
		cout<<"press enter (or ctrl+c) to exit...\n";
		getchar();
	}catch(const char* s){
		cout<<s<<endl;
	}



	cout<<"done"<<endl;
	return 0;
}
