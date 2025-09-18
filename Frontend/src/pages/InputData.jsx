import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';

export default function SymptomForm() {
  const { t } = useLanguage();

  const [symptoms, setSymptoms] = useState({
    abdominalPain: 0,
    nauseaVomiting: 0,
    weaknessLossOfAppetite: 0,
    fever: 0,
  });

  const handleChange = (field, value) => {
    setSymptoms(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {

  try {
    const response = await fetch("http://localhost:5000/taluk/symptoms/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ data: symptoms }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Symptoms submitted!");
    } else {
      alert("Error: " + (result.error || result.message));
    }
  } catch (err) {
    console.error("Submission failed", err);
    alert("Something went wrong");
  }

  // reset form after submission
  setSymptoms({
    abdominalPain: 0,
    nauseaVomiting: 0,
    weaknessLossOfAppetite: 0,
    fever: 0,
  });
};



  const renderSymptom = (label, field) => (
    <div className="flex flex-col gap-2 bg-white p-3 rounded-lg shadow-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
        <span>0</span>
        <span>{symptoms[field]}</span>
        <span>10</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={symptoms[field]}
        onChange={(e) => handleChange(field, parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{t('symptomFormTitle')}</CardTitle>
          <CardDescription>Rate each symptom from 0 (none) to 10 (severe)</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {renderSymptom('Abdominal Pain / Discomfort', 'abdominalPain')}
          {renderSymptom('Nausea / Vomiting', 'nauseaVomiting')}
          {renderSymptom('Weakness / Loss of Appetite', 'weaknessLossOfAppetite')}
          {renderSymptom('Fever', 'fever')}

          <Button
            onClick={handleSubmit}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
          >
            Submit Symptoms
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
