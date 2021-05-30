import requests

url = 'http://localhost:9876/detect'

form_data = {
    "algorithm": (None, 'Simple'),
    "learnFile": open("train.csv", "rb"),
    "detectFile": open("test.csv", "rb")
}

test_response = requests.post(url=url, files = form_data)

print(test_response.text)