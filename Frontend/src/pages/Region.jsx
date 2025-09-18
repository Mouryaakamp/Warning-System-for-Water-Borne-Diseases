import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function HealthScreen() {
  const [selectedTopic, setSelectedTopic] = useState('');

  const topics = [
    { value: 'nutrition', label: 'Nutrition & Diet' },
    { value: 'exercise', label: 'Exercise & Fitness' },
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'disease-prevention', label: 'Disease Prevention' },
    { value: 'hygiene', label: 'Hygiene & Sanitation' },
  ];

  const topicDetails = {
    'nutrition': {
      description: 'Balanced nutrition includes carbohydrates, proteins, fats, vitamins, and minerals. A healthy diet boosts immunity and prevents chronic illnesses.',
      tips: ['Eat fresh fruits & vegetables', 'Stay hydrated', 'Limit junk food']
    },
    'exercise': {
      description: 'Regular physical activity strengthens muscles, improves heart health, and reduces stress. Aim for at least 30 minutes daily.',
      tips: ['Daily walking or jogging', 'Stretching exercises', 'Yoga or meditation']
    },
    'mental-health': {
      description: 'Mental well-being is as important as physical health. Stress management and emotional balance improve overall quality of life.',
      tips: ['Practice mindfulness', 'Talk to loved ones', 'Seek professional help if needed']
    },
    'disease-prevention': {
      description: 'Preventive care reduces the risk of major diseases. Vaccination, screening, and lifestyle choices play a crucial role.',
      tips: ['Get vaccinated', 'Regular health checkups', 'Maintain hygiene']
    },
    'hygiene': {
      description: 'Good hygiene prevents infections and promotes overall well-being.',
      tips: ['Wash hands regularly', 'Use clean drinking water', 'Maintain personal hygiene']
    },
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Card className="m-4 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Health Information</CardTitle>
          <CardDescription>Select a health topic to learn more</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Topic</label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a health topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic.value} value={topic.value}>
                    {topic.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTopic && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">
                  {topics.find(t => t.value === selectedTopic)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  {topicDetails[selectedTopic]?.description}
                </p>

                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {topicDetails[selectedTopic]?.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Skeleton Video Page (UI only, no real video) */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Health Video</CardTitle>
              <CardDescription>A sample video page layout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                Video Placeholder
              </div>
              <div className="mt-4 space-y-2">
                <p className="font-medium">How to Stay Healthy</p>
                <p className="text-sm text-gray-600">
                  This is a demo video card layout. Replace this with a real embedded video later.
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
