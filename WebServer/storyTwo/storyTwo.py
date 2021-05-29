import requests

url = 'http://localhost:9876/detect'
myobj = {'somekey': 'Simple'}

x = requests.post(url, data = myobj)
test_files = {
    "algorithm": 'Simple',
    "learnFile": open("train.csv", "rb"),
    "detectFile": open("test.csv", "rb")
}

test_response = requests.post(url=url, files = test_files)


print(test_response.text)