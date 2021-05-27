
#include "Server.h"

	string socketIO::read(){
		char c=0;
		size_t i=0;
		string s="";
		while(c!='\n'){
			recv(clientID,&c,sizeof(char),0);
			s+=c;
		}
		return s;
	}
	void socketIO::write(string text){
		const char* txt=text.c_str();
		send(clientID,txt,strlen(txt),0);		
	}

	void socketIO::write(float f){
		ostringstream ss;
		ss <<f;
		string s(ss.str());		
		write(s);
	}

	void socketIO::read(float* f){
		// recv(clientID,f,sizeof(float),0);
		// it will be already in the string line
	}


Server::Server(int port)throw (const char*) { // @suppress("Class members should be properly initialized")
	  stopped=false;
	  fd=socket(AF_INET,SOCK_STREAM,0);
	  if(fd<0)
		throw "socket failed";

	  server.sin_family = AF_INET;
	  server.sin_addr.s_addr = INADDR_ANY;
	  server.sin_port = htons(port);

	  if(bind(fd,(struct sockaddr*)&server, sizeof(server))<0)
		throw "bind failure";

	  if(listen(fd, 3)<0)
		throw "listen failure";
}

void sigHandler(int sigNum){
	cout<<"sidH"<<endl;
}

void Server::start(ClientHandler& ch)throw(const char*){
	cout << "server started" << endl;	
	t=new thread([&ch,this](){
		vector<thread*> threads;
		while(!stopped){
			socklen_t clientSize=sizeof(client);
			cout << "waiting for a client" << endl;
			int aClient = accept(fd,(struct sockaddr*)&client,&clientSize);
			cout << "client connected" << endl;
			if(aClient>0){
				threads.push_back(new thread([&aClient,this,&ch](){
					ch.handle(aClient);
					close(aClient);
					cout << "client closed" << endl;
				}));
			}
		}
		close(fd);
		for (thread* tt : threads){
			tt->join();
			delete tt;
		}
	});
}

void Server::stop(){
	stopped=true;
	cout << "joining thread" << endl;
	struct sigaction sact;
	sigemptyset(&sact.sa_mask);
	sact.sa_flags = 0;
	sact.sa_handler = sigHandler;
	sigaction(SIGALRM, &sact, NULL);

	std::this_thread::sleep_for(std::chrono::milliseconds(1000));
	pthread_kill(t->native_handle(),SIGALRM);
	t->join(); // do not delete this!
	delete t;
	cout << "thread joined" << endl;
}

Server::~Server() {
	if(!stopped)
		stop();
	// TODO Auto-generated destructor stub
}

