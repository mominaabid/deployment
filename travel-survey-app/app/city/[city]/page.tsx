"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";

export default function CityDetails() {
  const params = useParams<{ city?: string }>();
  const router = useRouter();
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [cityInfo, setCityInfo] = useState<any>(null);
  const [activities, setActivities] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [travelers, setTravelers] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const cityName = decodeURIComponent(params.city || "");
    setCity(cityName);

    const storedStartDate = localStorage.getItem("start_date") || "";
    const storedEndDate = localStorage.getItem("end_date") || "";
    const storedTravelers = localStorage.getItem("travelers") || "";
    setStartDate(storedStartDate);
    setEndDate(storedEndDate);
    setTravelers(storedTravelers);

    const fetchAllData = async () => {
      try {
        const minDelay = 3000;
        const maxDelay = 4000;
        const startTime = Date.now();
        const response = await fetch("https://mominaabid.pythonanywhere.com/get_city_info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city: cityName,
            start_date: storedStartDate,
            end_date: storedEndDate,
            travelers: storedTravelers,
          }),
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Direct API Response:", data);

        if (data.description && data.activities?.length > 0) {
          setCityInfo(data);
          setActivities(data.activities);
          setCountry(data.country || "");

          const imgResponse = await fetch(`/api/getCityImage?city=${encodeURIComponent(data.country || cityName)}`);
          if (!imgResponse.ok) throw new Error(`Image fetch failed! Status: ${imgResponse.status}`);
          const imgData = await imgResponse.json();
          setBackgroundImage(imgData.imageUrl || "/mountains.jpg");

          const elapsedTime = Date.now() - startTime;
          const delay = Math.random() * (maxDelay - minDelay) + minDelay;
          const remainingDelay = Math.max(0, delay - elapsedTime);
          if (remainingDelay > 0) await new Promise((resolve) => setTimeout(resolve, remainingDelay));
        } else {
          alert("No activities found for this city. Redirecting...");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch activities. Redirecting...");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [params.city, router]);

  const handleToggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmitActivities = () => {
    if (selectedActivities.length === 0) {
      alert("Please select at least one activity.");
      return;
    }

    if (!cityInfo) {
      alert("City information is missing. Please restart.");
      return;
    }

    setIsLoading(true);
    localStorage.setItem("selected_activities", JSON.stringify(selectedActivities));
    setTimeout(() => {
      router.push(`/survey/${city}`);
    }, 800);
  };

  const formatDateRange = () => {
    if (!startDate && !endDate) return "Not specified";
    if (startDate && !endDate) return startDate;
    if (!startDate && endDate) return `Until ${endDate}`;
    return `${startDate} to ${endDate}`;
  };

  const SVGLoader = () => (
    <motion.div
      {...({
        className: "fixed inset-0 bg-gray-900/95 z-50 flex items-center justify-center",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      } as HTMLMotionProps<"div">)}
    >
      <div className="text-center">
        <svg className="svg-calLoader" xmlns="http://www.w3.org/2000/svg" width="230" height="230">
          {/* SVG paths here (unchanged) */}
        </svg>
        <motion.div
          {...({
            initial: { opacity: 0, y: 5 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "text-teal-400 text-xl font-medium mt-4",
          } as HTMLMotionProps<"div">)}
        >
          Loading your travel experience...
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnimatePresence>{isLoading && <SVGLoader />}</AnimatePresence>

      {!isLoading && (
        <>
          <div className="relative h-96 overflow-hidden">
            {backgroundImage && (
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <img
                  src={backgroundImage}
                  alt={`${city}, ${country}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-2 tracking-tight drop-shadow-lg">
                {city}
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-teal-300 text-center tracking-wide drop-shadow-md">
                {country}
              </h2>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-12 text-center">
            <div className="bg-gray-800 bg-opacity-80 rounded-xl p-8 shadow-xl">
              <p className="text-xl leading-relaxed text-gray-200 mb-6">
                {cityInfo?.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-700 rounded-lg p-4">
                  <span className="block text-teal-300 font-semibold">Travel Dates</span>
                  <span className="text-lg">{formatDateRange()}</span>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <span className="block text-teal-300 font-semibold">Travelers</span>
                  <span className="text-lg">{travelers || "Not specified"}</span>
                </div>
                <div className="md:col-span-1 col-span-2 bg-gray-700 rounded-lg p-4">
                  <span className="block text-teal-300 font-semibold">Selected Activities</span>
                  <span className="text-lg">{selectedActivities.length} of {activities.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 pb-16">
            <h2 className="text-3xl font-bold text-center text-teal-300 mb-8">
              Choose Your Activities
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  {...({
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.05 * (index % 10) },
                    whileHover: { scale: 1.03 },
                    onClick: () => handleToggleActivity(activity),
                    className: `relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
                      selectedActivities.includes(activity)
                        ? "ring-4 ring-teal-400 scale-105"
                        : "hover:scale-105"
                    }`,
                  } as HTMLMotionProps<"div">)}
                >
                  <div
                    className={`absolute inset-0 ${
                      selectedActivities.includes(activity)
                        ? "bg-teal-500 bg-opacity-80"
                        : "bg-gray-800 bg-opacity-70 group-hover:bg-opacity-60"
                    } transition-colors duration-300`}
                  ></div>

                  <div className="p-6 relative z-10 h-full flex items-center justify-center">
                    <h3
                      className={`text-xl font-bold text-center ${
                        selectedActivities.includes(activity)
                          ? "text-white"
                          : "text-gray-100"
                      }`}
                    >
                      {activity}
                    </h3>
                  </div>

                  {selectedActivities.includes(activity) && (
                    <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <motion.button
                {...({
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  onClick: handleSubmitActivities,
                  disabled: selectedActivities.length === 0,
                  className:
                    "px-8 py-4 bg-teal-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2",
                } as HTMLMotionProps<"button">)}
              >
                <span>Craft My Journey</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            <div className="text-center mt-8 text-gray-400">
              Start your adventure in {city} today
            </div>
          </div>
        </>
      )}
    </div>
  );
}
