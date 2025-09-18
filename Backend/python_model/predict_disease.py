import sys, json, joblib, pandas as pd, os

def main():
    # Load input JSON and disease type
    data = json.loads(sys.argv[1])
    disease = sys.argv[2]
    df = pd.DataFrame([data])

    # Define feature sets
    water_quality_features = [
        "contaminant_level","ph_level","turbidity","dissolved_oxygen",
        "nitrate_level","lead_concentration","bacteria_count"
    ]
    socio_features = [
        "water_source_Pond","water_source_River","water_source_Spring",
        "water_source_Tap","water_source_Well","access_to_clean_water",
        "infant_mortality_rate","gdp","healthcare_access",
        "urbanization_rate","sanitation_coverage","rainfall_per_year",
        "temperature","population_density"
    ]
    symptom_features = ["abdominal_pain","nausea_vomiting","weakness_loss_of_appetite","fever"]

    # Load model and select correct features
    if disease == "diarrheal":
        model = joblib.load(os.path.join(os.path.dirname(__file__), "diarrheal_model.pkl"))
        X = df[water_quality_features + symptom_features]
    elif disease == "cholera":
        model = joblib.load(os.path.join(os.path.dirname(__file__), "cholera_model.pkl"))
        X = df[water_quality_features + symptom_features]
    elif disease == "typhoid":
        model = joblib.load(os.path.join(os.path.dirname(__file__), "typhoid_model.pkl"))
        X = df[socio_features + symptom_features]
    else:
        raise ValueError("Invalid disease name")

    # Make prediction
    pred = model.predict(X)[0]
    print(json.dumps({disease: float(pred)}))

if __name__ == "__main__":
    main()
