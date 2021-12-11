import json

import numpy as np
from flask import Flask, request
from keras.models import load_model
from PIL import Image, ImageOps

app = Flask(__name__)


"""
    We obtained this file and the keras_model.h5 file from teachable machine.

    We added the result variable at the bottom of the code to hold the result
    of the prediction. Depending on how you enter in your classes into teachable
    machine will determine the prediction for your output. 

    For example, in teachable machine, when we uploaded the images the first class 
    was labeled Fifty and the second class was labeled Hundred. The prediction that 
    the model returns is an array of arrays, so essentially a 2D array. If the first 
    element[0][0] is more than 0.5.... that means the image you uploaded is more than
    likely a Fifty Dollar bill. If the second element[0][1] is more than 0.5... then 
    the image is a Hundred Dollar bill. Which is why we incorporated the if statment 
    at the bottom. 

    As previously mentioned, python will return this result if the image is a
    Fifty Dollar Bill or a Hundred Dollar Bill to server.js and server.js will return 
    the result to app.js and display it. 
"""


@app.route('/predict', methods=['POST'])
def predict():
    # Load the model
    model = load_model('keras_model.h5')

    # Create the array of the right shape to feed into the keras model
    # The 'length' or number of images you can put into the array is
    # determined by the first position in the shape tuple, in this case 1.
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    # Replace this with the path to your image
    image = Image.open(request.files['file'])
    # resize the image to a 224x224 with the same strategy as in TM2:
    # resizing the image to be at least 224x224 and then cropping from the center
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

    # turn the image into a numpy array
    image_array = np.asarray(image)
    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
    # Load the image into the array
    data[0] = normalized_image_array

    # run the inference
    prediction = model.predict(data)
    print(prediction)
    result = None
    print('gfdgdfg', prediction[0][1])
    if prediction[0][0] > 0.50:
        result = 'fifty'
    else:
        result = 'hundred'

    return {'prediction': result}
