# SMS Spam Detection (TF‑IDF + Multinomial Naive Bayes)

## Overview
- Text classification project that detects whether an SMS message is spam or ham.
- Uses `TfidfVectorizer` for feature extraction and `MultinomialNB` for classification.
- Trains/evaluates on the widely used SMS Spam Collection dataset.
- All code is contained in the notebook: [spam deletction.ipynb](spam%20deletction.ipynb).

## Dataset
- Source: Kaggle — "SMS Spam Collection" (`abhishek14398/sms-spam-collection`).
- The notebook downloads via `kagglehub` and reads `SMSSpamCollection.csv`.
- Columns used after parsing: `label` (ham/spam) and `message` (text).

If `kagglehub` cannot access Kaggle from your environment, download the dataset manually from Kaggle and place `SMSSpamCollection.csv` in a local folder. Then adjust the loading cell to read your local path.

## Environment & Setup (Windows)
Recommended: a virtual environment.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install pandas scikit-learn kagglehub
```

Notes:
- `kagglehub` may prompt for or require Kaggle credentials depending on environment. If you cannot authenticate, use the manual download approach noted above.

## Run The Notebook
1. Open the notebook: [spam deletction.ipynb](spam%20deletction.ipynb).
2. Run cells top-to-bottom. The flow is:
	 - Download dataset with `kagglehub` and load into a `pandas` DataFrame.
	 - Parse the raw text into `label` and `message` columns; create a numeric `label_number`.
	 - Vectorize with `TfidfVectorizer(stop_words="english")`.
	 - Split train/test (`test_size=0.2`, `random_state=42`).
	 - Train `MultinomialNB` and evaluate (`accuracy_score`, `classification_report`).

## Model Details
- **Features:** TF‑IDF of SMS text, English stopwords removed.
- **Classifier:** `MultinomialNB` (Naive Bayes for token counts/TF‑IDF).
- **Split:** 80/20 train/test with fixed seed (`42`).

## Results
- The notebook prints accuracy and a full classification report (precision/recall/F1 for ham/spam). Actual numbers can vary by environment and preprocessing but are typically strong for this dataset.

## Quick Inference (inside the notebook)
Add a small cell after training:

```python
samples = [
		"Congratulations! You've won a free ticket. Reply NOW",
		"Hey, are we still meeting at 6?"
]
X_new = vactorizer.transform(samples)  # variable name as defined in the notebook
pred = model.predict(X_new)
pred
```

## Troubleshooting
- **Kaggle access:** If `kagglehub` cannot fetch the dataset, manually download `SMSSpamCollection.csv` from Kaggle and point the `read_csv` call to your local path.
- **Package versions:** If you encounter import/runtime issues, try updating packages:
	```powershell
	pip install --upgrade pandas scikit-learn kagglehub
	```

## Next Steps
- Try alternative models: `LogisticRegression`, `LinearSVC`, or `ComplementNB`.
- Add a simple preprocessing pipeline (lowercasing, URL/number normalization).
- Tune TF‑IDF (n‑grams, min_df/max_df) and apply class-weighting if needed.
- Plot a confusion matrix and ROC/PR curves for deeper evaluation.

## Acknowledgements
- Dataset: SMS Spam Collection (Kaggle).
- Libraries: pandas, scikit‑learn, kagglehub.

