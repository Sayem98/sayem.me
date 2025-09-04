import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TerminalMode from "./terminal/TerminalMode";
import GlobalBackground from "./components/Background";
import BottomNavBar from "./components/BottomNavBar";
import RainBackground from "./components/RainCloudBackground";
import CloudBackground from "./components/CloudBackground";

// Example interfaces matching OpenWeatherMap response (simplified)
interface WeatherCondition {
  id: number;
  main: string; // e.g., "Rain", "Clear", "Clouds"
  description: string;
  icon: string;
}

interface WeatherData {
  weather: WeatherCondition[];
  main?: {
    temp: number;
    humidity: number;
  };
}

const App = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const [terminalMode, setTerminalMode] = useState(false);

  // useEffect(() => {
  //   async function fetchWeather(lat: number, lon: number) {
  //     try {
  //       const apiKey = "001ab9b4deb074211fc3a22587659464";
  //       const res = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  //       );

  //       if (!res.ok) {
  //         // Set default weather data on error response
  //         setWeather({
  //           weather: [
  //             { id: 0, main: "Clear", description: "Clear sky", icon: "" },
  //           ],
  //           main: { temp: 20, humidity: 50 },
  //         });
  //         return;
  //       }
  //       const data: WeatherData = await res.json();

  //       setWeather({
  //         weather: data.weather,
  //         main: {
  //           temp: data.main?.temp ?? 20,
  //           humidity: data.main?.humidity ?? 50,
  //         },
  //       });
  //     } catch (err) {
  //       // setError((err as Error).message);
  //       console.error(err);
  //     }
  //   }
  //   // Get user location using Geolocation API
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         fetchWeather(position.coords.latitude, position.coords.longitude);
  //       },
  //       (error) => {
  //         // setError("Failed to get location: " + error.message);
  //         // setLoading(false);
  //       }
  //     );
  //   } else {
  //     // setError("Geolocation is not supported by this browser.");
  //     // setLoading(false);
  //   }
  //   // fetchWeather();
  // }, []);

  const mainWeather = weather?.weather[0]?.main || "";
  console.log("Main Weather:", mainWeather);

  return (
    <div className="w-full max-h-fit overflow-hidden text-foreground relative">
      {/* Background Pattern & Blobs */}
      {/* {!terminalMode && <GlobalBackground />}  */}
      {/* Rain and Cloud Backgrounds */}
      {/* Conditionally render backgrounds */}
      {(mainWeather === "Rain" ||
        mainWeather === "Drizzle" ||
        mainWeather === "Thunderstorm") && <RainBackground />}
      {(mainWeather === "Clouds" || mainWeather === "Clear") && (
        <CloudBackground />
      )}

      {/* Main Content */}

      {/* Navbar */}
      <Navbar terminalMode={terminalMode} setTerminalMode={setTerminalMode} />

      {/* Main View Switch */}
      {!terminalMode ? (
        !activeSection ? (
          <BottomNavBar />
        ) : (
          <></>
        )
      ) : (
        <TerminalMode />
      )}
    </div>
  );
};

export default App;
