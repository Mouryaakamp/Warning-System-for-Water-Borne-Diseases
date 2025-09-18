import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "../contexts/LanguageContext";

export default function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    taluk: "",
  });

  const talukOptions = ["Taluk1", "Taluk2", "Taluk3"];
  const [talukData, setTalukData] = useState({});
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch taluk data and immediately get predictions
  useEffect(() => {
    const fetchTalukDataAndPredict = async () => {
      try {
        const res = await fetch("http://localhost:5000/taluk/symptoms/average-all-taluks");
        const data = await res.json();
        setTalukData(data);

        const results = {};
        for (const [taluk, avgData] of Object.entries(data)) {
          if (avgData === "No data") continue;

          const payload = {
            abdominal_pain: avgData.abdominalPain,
            nausea_vomiting: avgData.nauseaVomiting,
            weakness_loss_of_appetite: avgData.weaknessLossOfAppetite,
            fever: avgData.fever,
            contaminant_level: avgData.contaminant_level || 4.0,
            ph_level: avgData.ph_level || 7.0,
            turbidity: avgData.turbidity || 12.0,
            dissolved_oxygen: avgData.dissolved_oxygen || 5.5,
            nitrate_level: avgData.nitrate_level || 12.0,
            lead_concentration: avgData.lead_concentration || 5.0,
            bacteria_count: avgData.bacteria_count || 400,
            water_source_Pond: avgData.water_source_Pond || 0,
            water_source_River: avgData.water_source_River || 0,
            water_source_Spring: avgData.water_source_Spring || 0,
            water_source_Tap: avgData.water_source_Tap || 0,
            water_source_Well: avgData.water_source_Well || 1,
            access_to_clean_water: avgData.access_to_clean_water || 70.0,
            infant_mortality_rate: avgData.infant_mortality_rate || 18.0,
            gdp: avgData.gdp || 9000.0,
            healthcare_access: avgData.healthcare_access || 60.0,
            urbanization_rate: avgData.urbanization_rate || 45.0,
            sanitation_coverage: avgData.sanitation_coverage || 60.0,
            rainfall_per_year: avgData.rainfall_per_year || 1300.0,
            temperature: avgData.temperature || 27.0,
            population_density: avgData.population_density || 300
          };

          const diseases = ["diarrheal", "cholera", "typhoid"];
          results[taluk] = {};

          for (const disease of diseases) {
            const res = await fetch(`http://localhost:5000/predict/${disease}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const responseData = await res.json();
            results[taluk][disease] = parseFloat(responseData[disease].toFixed(2));
          }
        }

        setPredictions(results);
      } catch (err) {
        console.error("Failed to fetch/predict taluk data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTalukDataAndPredict();
  }, []);

  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/create-taluk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          talukName: newUser.taluk,
          username: newUser.username,
          password: newUser.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add user");
        return;
      }

      alert(data.message);
      setNewUser({ username: "", password: "", taluk: "" });
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Failed to add user. Please try again.");
    }
  };

 const renderAddUser = () => (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <Card className="shadow-sm relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab("dashboard")}
          className="absolute top-4 left-4 text-blue-600"
        >
          ← Back
        </Button>

        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Create a new user account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Taluk Name</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {newUser.taluk || "Select Taluk"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Taluk</DropdownMenuLabel>
                {talukOptions.map((taluk) => (
                  <DropdownMenuItem
                    key={taluk}
                    onClick={() => setNewUser({ ...newUser, taluk })}
                  >
                    {taluk}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              placeholder="Enter username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm password"
              value={newUser.confirmPassword}
              onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
            />
            {newUser.confirmPassword &&
              newUser.confirmPassword !== newUser.password && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
          </div>

          <Button onClick={handleAddUser} className="w-full">
            <span className="material-icons mr-2">add</span>
            Add User
          </Button>
        </CardContent>
      </Card>
    </div>
  )


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {activeTab === "dashboard" ? (
        <div className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold text-blue-600">
                Welcome to Dashboard
              </h2>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {Object.entries(predictions).map(([taluk, pred]) => (
                    <div key={taluk} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <h3 className="font-medium text-gray-800">{taluk}</h3>
                      <ul className="text-gray-700 mt-2 font-semibold">
                        <li>Diarrheal Prediction: {pred.diarrheal}</li>
                        <li>Cholera Prediction: {pred.cholera}</li>
                        <li>Typhoid Prediction: {pred.typhoid}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        renderAddUser()
      )}

      {/* Bottom Tabs */}
      <div className="flex border-t bg-white shadow-lg">
        <Button
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          className="flex-1 flex-col h-16 gap-1"
          onClick={() => setActiveTab("dashboard")}
        >
          <span className="material-icons text-lg">data_usage</span>
          <span className="text-xs">Dashboard</span>
        </Button>

        <Button
          variant={activeTab === "addUser" ? "default" : "ghost"}
          className="flex-1 flex-col h-16 gap-1"
          onClick={() => setActiveTab("addUser")}
        >
          <span className="material-icons text-lg">person</span>
          <span className="text-xs">Add User</span>
        </Button>
      </div>
    </div>
  );
}
