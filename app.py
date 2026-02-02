from flask import Flask, render_template, request, jsonify
import pickle

app = Flask(__name__)

model = pickle.load(open("spam_detection.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))  

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    msg = request.form["message"]
    data = vectorizer.transform([msg])
    result = model.predict(data)[0]
    return jsonify({"prediction": "Spam" if result == 1 else "Not Spam"})

app.run(debug=True)
