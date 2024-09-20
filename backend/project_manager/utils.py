import requests


def get_random_image():
    response = requests.get("https://picsum.photos/200")
    return response.content
