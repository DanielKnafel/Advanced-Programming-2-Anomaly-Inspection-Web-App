

#ifndef CLI_H_
#define CLI_H_

#include <vector>
#include <algorithm>
#include <string.h>
#include "commands.h"
#include <map>

using namespace std;

class CLI {
	vector<Command*> commands;
	DefaultIO* dio;
	map<int, vector<correlatedFeatures>> models;
public:
	CLI(DefaultIO* dio);
	void start();
	virtual ~CLI();
};

#endif /* CLI_H_ */
