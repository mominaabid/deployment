"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface TravelPlan {
  city: string;
  start_date: string;
  end_date: string;
  city_description: string;
  travel_plan: string;
}

interface ItineraryDay {
  day: string;
  morning: string;
  afternoon: string;
  evening: string;
}

interface Hotel {
  hotel_name: string;
  hotel_images: string[];
  description: string;
  nightrate: string;
  total_rate: string;
  hotel_cat: string;
  amnity: string[];
  chk_in: string;
  chk_out: string;
  nearbylist: string[];
  discount: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rating = parseFloat(hotel.hotel_cat.split("-")[0]) || 4.0;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={`star-${i}`}
            className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={`star-half-${i}`}
            className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={`star-empty-${i}`}
            className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes("wi-fi")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9 9 0 0112.16 0m-9.642-9.642a13 13 0 0118.284 0" />
        </svg>
      );
    } else if (lowerAmenity.includes("parking")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16V8h3a3 3 0 013 3v2a3 3 0 01-3 3H8zm8 0h4M4 4h16v16H4V4z" />
        </svg>
      );
    } else if (lowerAmenity.includes("air conditioning")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 12h16M4 16h16m-2-8v8" />
        </svg>
      );
    } else if (lowerAmenity.includes("restaurant")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      );
    } else if (lowerAmenity.includes("room service")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18m-9-6v12m-6-6h12" />
        </svg>
      );
    } else if (lowerAmenity.includes("laundry")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12v12H6zm3-3h6v3H9zm3 6a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      );
    } else if (lowerAmenity.includes("business")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-9-4h-2m-6 4h12m-6 4h-2" />
        </svg>
      );
    } else if (lowerAmenity.includes("child-friendly")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a3 3 0 100-6 3 3 0 000 6zm-4 8h8m-8 0a4 4 0 014-4h0a4 4 0 014 4" />
        </svg>
      );
    } else if (lowerAmenity.includes("breakfast")) {
      return (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18v6H3zm2 8h14v2H5z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hotel.hotel_images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === hotel.hotel_images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {/* Compact Card */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-5 shadow-lg border border-gray-600 w-full mx-auto">
        <h3 className="text-lg sm:text-xl font-bold text-teal-400 mb-2">{hotel.hotel_name}</h3>
        <div className="relative h-40 sm:h-48 w-full mb-4 rounded-lg overflow-hidden">
          <img
            src={hotel.hotel_images[0] || "/api/placeholder/300/200"}
            alt={hotel.hotel_name}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{hotel.description}</p>
        <div className="flex items-center mb-2 sm:mb-3">
          <div className="flex items-center">
            {renderStars(rating)}
            <span className="ml-1 sm:ml-2 text-gray-300 text-xs sm:text-sm">{rating}/5</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="w-4 sm:w-5 h-4 sm:h-5 text-teal-400 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .896 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-teal-400 font-semibold text-base sm:text-lg">{hotel.nightrate}/night</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white py-1 px-2 sm:px-3 rounded-lg transition-colors text-xs font-medium"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal for Full Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 max-w-lg sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-teal-400">{hotel.hotel_name}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Carousel */}
            <div className="relative mb-4">
              <div className="h-48 sm:h-64 w-full rounded-lg overflow-hidden">
                <img
                  src={hotel.hotel_images[currentImageIndex] || "/api/placeholder/300/200"}
                  alt={`Image ${currentImageIndex + 1} of ${hotel.hotel_name}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="flex justify-center mt-2">
                {hotel.hotel_images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full mx-1 ${
                      currentImageIndex === index ? "bg-teal-400" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Hotel Details */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-teal-400 mb-1">Description</h4>
                <p className="text-gray-300 text-sm sm:text-base">{hotel.description}</p>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold text-teal-400 mb-1">Rating</h4>
                <div className="flex items-center">
                  {renderStars(rating)}
                  <span className="ml-2 text-gray-300 text-sm">{rating}/5</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold text-teal-400 mb-1">Pricing</h4>
                <p className="text-gray-300 text-sm sm:text-base">
                  Nightly Rate: {hotel.nightrate} | Total Rate: {hotel.total_rate}
                </p>
                {hotel.discount !== "N/A" && (
                  <p className="text-teal-400 text-sm sm:text-base font-semibold">{hotel.discount}</p>
                )}
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold text-teal-400 mb-1">Check-In / Check-Out</h4>
                <p className="text-gray-300 text-sm sm:text-base">
                  Check-In: {hotel.chk_in} | Check-Out: {hotel.chk_out}
                </p>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold text-teal-400 mb-1">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {hotel.amnity.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-700 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-200 border border-gray-500"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold text-teal-400 mb-1">Nearby Places</h4>
                <ul className="text-gray-300 text-sm sm:text-base space-y-1">
                  {hotel.nearbylist.map((place, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function HotelRecommendations({ city, startDate, endDate }: { city: string; startDate: string; endDate: string }) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        if (!city || !startDate || !endDate) {
          throw new Error("Missing required parameters: city, startDate, or endDate");
        }

        const url = "https://honesttravel.pythonanywhere.com/google_hotel_list";
        const requestBody = JSON.stringify({
          input_city: city,
          input_dt1: startDate,
          input_dt2: endDate,
        });

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch hotel recommendations: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Raw API Response:", data);

        let hotelsArray: any[] = [];
        if (Array.isArray(data)) {
          hotelsArray = data
            .map((item: string) => {
              try {
                return JSON.parse(item);
              } catch (e) {
                console.error("Error parsing hotel JSON:", e);
                return null;
              }
            })
            .filter((item) => item !== null);
        } else {
          throw new Error("Invalid response format: Expected an array of hotel objects");
        }

        const mappedHotels: Hotel[] = hotelsArray.map((hotel: any, index: number) => {
          console.log(`Mapping hotel ${index}:`, hotel);

          return {
            hotel_name: hotel.hotel_name && hotel.hotel_name !== "N/A" ? hotel.hotel_name : "Unknown Hotel",
            hotel_images: Array.isArray(hotel.hotel_images) ? hotel.hotel_images : [],
            description: hotel.description && hotel.description !== "N/A" ? hotel.description : "No description available.",
            nightrate: hotel.nightrate && hotel.nightrate !== "N/A" ? hotel.nightrate : hotel.total_rate && hotel.total_rate !== "N/A" ? hotel.total_rate : "$200/night",
            total_rate: hotel.total_rate && hotel.total_rate !== "N/A" ? hotel.total_rate : "$400",
            hotel_cat: hotel.hotel_cat && hotel.hotel_cat !== "" ? hotel.hotel_cat : "4.0",
            amnity: Array.isArray(hotel.amnity)
              ? hotel.amnity.filter((a: string) => a && a.trim() !== "N/A" && a.trim() !== "")
              : typeof hotel.amnity === "string" && hotel.amnity !== "N/A"
              ? hotel.amnity.split(", ").filter((a: string) => a.trim() !== "")
              : ["No amenities listed"],
            chk_in: hotel.chk_in && hotel.chk_in !== "N/A" ? hotel.chk_in : "Not available",
            chk_out: hotel.chk_out && hotel.chk_out !== "N/A" ? hotel.chk_out : "Not available",
            nearbylist: Array.isArray(hotel.nearbylist) ? hotel.nearbylist : [],
            discount: hotel.discount && hotel.discount !== "N/A" ? hotel.discount : "N/A",
          };
        });

        setHotels(mappedHotels);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching hotel recommendations:", error.message);
        setError(error.message);

        console.log("Falling back to mock hotel data");
        const mockHotels: Hotel[] = [
          {
            hotel_name: "Grand City Hotel",
            hotel_images: ["/api/placeholder/300/200"],
            description: "Luxury hotel in the heart of downtown with amazing city views.",
            nightrate: "$250/night",
            total_rate: "$500",
            hotel_cat: "4.7-star hotel",
            amnity: ["Free Wi-Fi", "Pool", "Spa", "Fitness Center", "Free Breakfast"],
            chk_in: "2:00 PM",
            chk_out: "11:00 AM",
            nearbylist: ["Downtown Plaza, Walk, 5 min"],
            discount: "Best Rate",
          },
          {
            hotel_name: "Riverside Inn",
            hotel_images: ["/api/placeholder/300/200"],
            description: "Charming boutique hotel located near major attractions.",
            nightrate: "$180/night",
            total_rate: "$360",
            hotel_cat: "4.5-star hotel",
            amnity: ["Restaurant", "Free Parking", "Concierge Service", "Bar", "Room Service"],
            chk_in: "3:00 PM",
            chk_out: "12:00 PM",
            nearbylist: ["Riverfront Park, Walk, 10 min"],
            discount: "N/A",
          },
          {
            hotel_name: "Urban Suites",
            hotel_images: ["/api/placeholder/300/200"],
            description: "Modern all-suite hotel with kitchenettes, perfect for extended stays.",
            nightrate: "$320/night",
            total_rate: "$640",
            hotel_cat: "4.8-star hotel",
            amnity: ["Kitchenette", "Laundry Service", "Business Center", "Free Wi-Fi", "Pet-Friendly"],
            chk_in: "1:00 PM",
            chk_out: "11:00 AM",
            nearbylist: ["City Museum, Taxi, 15 min"],
            discount: "Special Offer",
          },
        ];

        setHotels(mockHotels);
        setLoading(false);
      }
    };

    fetchHotels();
  }, [city, startDate, endDate]);

  const hotelsPerPage = 3;
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1));
  };

  const startIndex = currentIndex * hotelsPerPage;
  const displayedHotels = hotels.slice(startIndex, startIndex + hotelsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-8 h-8 border-t-4 border-b-4 border-teal-400 rounded-full animate-spin mb-2"></div>
          <p className="text-teal-400 text-sm">Loading hotels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-700 p-4 rounded-md text-center">
        <p className="text-red-400">Unable to load hotel recommendations: {error}</p>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="bg-gray-700 p-4 rounded-md text-center">
        <p className="text-gray-300">No hotel recommendations available for this location.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedHotels.map((hotel, index) => (
            <div key={`hotel-${index}`} className="w-full">
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 ${
              currentIndex === index ? "bg-teal-400" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TravelPlanPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityFromParams = params.city as string;

  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isBlurred, setIsBlurred] = useState(true);

  const [localStorageData, setLocalStorageData] = useState<{
    city: string;
    startDate: string;
    endDate: string;
  }>({ city: "", startDate: "", endDate: "" });

  const fetchCityImage = async (city: string) => {
    if (!city) {
      console.error("No city provided for image fetch");
      setBackgroundImage("");
      return;
    }

    try {
      const response = await fetch(`/api/getCityImage?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Response is not JSON. Content-Type: ${contentType}`);
      }
      const data = await response.json();
      setBackgroundImage(data.imageUrl);
      console.log("Background image set to:", data.imageUrl);
    } catch (error) {
      console.error("Error fetching city image:", error);
      setBackgroundImage("");
    }
  };

  useEffect(() => {
    if (!cityFromParams) return;

    const shouldUnblur = searchParams.get("unblur") === "true";
    setIsBlurred(!shouldUnblur);

    const storedCity = localStorage.getItem("city") || "";
    const storedStartDate = localStorage.getItem("start_date") || "";
    const storedEndDate = localStorage.getItem("end_date") || "";

    console.log("Stored values:", { storedCity, storedStartDate, storedEndDate });

    setLocalStorageData({
      city: storedCity,
      startDate: storedStartDate,
      endDate: storedEndDate,
    });

    const fetchData = async () => {
      try {
        console.log(`Fetching travel plan for city: ${cityFromParams}`);

        const response = await fetch(`https://mominaabid.pythonanywhere.com/api/get-travel-plan?city=${cityFromParams}`);

        if (!response.ok) throw new Error("Failed to fetch travel plan");

        const data = await response.json();
        setTravelPlan(data);
      } catch (error: any) {
        console.error("Error fetching travel plan:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCityImage(cityFromParams);
    fetchData();
  }, [cityFromParams, searchParams]);

  const handleUnblur = () => {
    router.push(`/travel-packages/${cityFromParams}`);
  };

  const handleDownload = () => {
    if (isBlurred) {
      alert("Please purchase a package to unblur and print the itinerary.");
      router.push(`/travel-packages/${cityFromParams}`);
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print the itinerary.");
      return;
    }

    const userEmail = localStorage.getItem("user_email") || "user@example.com";
    const planData = travelPlan && typeof travelPlan.travel_plan === "string"
      ? JSON.parse(travelPlan.travel_plan)
      : travelPlan?.travel_plan || { itinerary: [], travel_tips: "", local_food_recommendations: "", estimated_costs: "" };

    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    };

    const itineraryTableRows = planData.itinerary.map((dayPlan: ItineraryDay, index: number) => `
      <tr class="border-b border-gray-700">
        <td class="px-4 py-2 font-semibold text-teal-400">${dayPlan.day}</td>
        <td class="px-4 py-2">${dayPlan.morning}</td>
        <td class="px-4 py-2">${dayPlan.afternoon}</td>
        <td class="px-4 py-2">${dayPlan.evening}</td>
      </tr>
    `).join("");

    const printContent = `
      <html>
        <head>
          <title>Travel Plan for ${cityFromParams}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { font-family: Arial, sans-serif; }
            .table-container { max-width: 800px; margin: auto; }
            table { width: 100%; border-collapse: collapse; }
            th, td { text-align: left; }
            th { background-color: #2d3748; color: #81e6d9; }
            .section-title { color: #81e6d9; }
            .company-info { margin-bottom: 1.5rem; }
          </style>
        </head>
        <body class="bg-gray-900 text-white">
          <div class="table-container p-6">
            <h1 class="text-3xl font-bold mb-4 text-teal-400">Travel Plan for ${cityFromParams}</h1>
            <div class="company-info">
              <h2 class="section-title text-2xl font-bold mb-2">About Honest Travel Services</h2>
              <p class="text-gray-300 mb-4">
                At Honest Travel Services, we are dedicated to crafting unforgettable travel experiences tailored to your preferences. With a commitment to transparency, quality, and customer satisfaction, we provide personalized itineraries, expert recommendations, and seamless travel planning to ensure your journey is both memorable and hassle-free. Let us guide you to explore the world with confidence and excitement!
              </p>
            </div>
            <p class="mb-4">Email: ${userEmail}</p>
            <p class="mb-4">Dates: ${formatDate(localStorageData.startDate)} - ${formatDate(localStorageData.endDate)}</p>
            <p class="mb-6">${travelPlan?.city_description || "Explore the wonders of this destination!"}</p>

            <h2 class="section-title text-2xl font-bold mb-4">Itinerary</h2>
            <table class="mb-8">
              <thead>
                <tr>
                  <th className="px-4 py-2">Day</th>
                  <th className="px-4 py-2">Morning</th>
                  <th className="px-4 py-2">Afternoon</th>
                  <th className="px-4 py-2">Evening</th>
                </tr>
              </thead>
              <tbody>
                ${itineraryTableRows}
              </tbody>
            </table>

            <h2 class="section-title text-2xl font-bold mb-4">Travel Tips</h2>
            <p class="mb-6">${planData.travel_tips || "No travel tips available."}</p>

            <h2 class="section-title text-2xl font-bold mb-4">Local Food Recommendations</h2>
            <p class="mb-6">${planData.local_food_recommendations || "No food recommendations available."}</p>

            <h2 class="section-title text-2xl font-bold mb-4">Estimated Costs</h2>
            <p>${planData.estimated_costs || "No cost estimates available."}</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const handleShare = () => {
    if (isBlurred) {
      alert("Please purchase a package to unblur and share the plan.");
      router.push(`/travel-packages/${cityFromParams}`);
      return;
    }
    const shareUrl = `${window.location.origin}/travel-plan/${cityFromParams}`;
    const shareText = `Check out my travel plan for ${cityFromParams}: ${shareUrl}`;

    if (navigator.share) {
      navigator.share({
        title: `Travel Plan for ${cityFromParams}`,
        text: shareText,
        url: shareUrl,
      }).catch((error) => console.error("Error sharing:", error));
    } else {
      const shareOptions = [
        {
          name: "WhatsApp",
          url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
        },
        {
          name: "Email",
          url: `mailto:?subject=Travel Plan for ${cityFromParams}&body=${encodeURIComponent(shareText)}`,
        },
        {
          name: "Copy Link",
          action: () => {
            navigator.clipboard.writeText(shareUrl).then(() => {
              alert("Link copied to clipboard!");
            });
          },
        },
      ];

      const handleOptionClick = (option: { name: string; url?: string; action?: () => void }) => {
        if (option.action) {
          option.action();
        } else if (option.url) {
          window.open(option.url, "_blank");
        }
      };

      const selectedOption = prompt(
        "Select sharing method:\n" +
          shareOptions.map((opt, index) => `${index + 1}. ${opt.name}`).join("\n")
      );
      if (selectedOption !== null) {
        const index = parseInt(selectedOption) - 1;
        if (shareOptions[index]) {
          handleOptionClick(shareOptions[index]);
        } else {
          alert("Invalid selection!");
        }
      }
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const city = localStorageData.city || travelPlan?.city || cityFromParams || "";
  const startDate = localStorageData.startDate || travelPlan?.start_date || "";
  const endDate = localStorageData.endDate || travelPlan?.end_date || "";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-b-4 border-teal-400 rounded-full animate-spin mb-4"></div>
          <p className="text-teal-400 text-lg">Loading your travel plan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-300">Error: {error}</p>
          <button
            className="mt-4 sm:mt-6 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors w-full sm:w-auto"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!city || !startDate || !endDate) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-4">Missing Information</h2>
          <p className="text-gray-300">Please select a city and valid date range from the homepage.</p>
          <button
            className="mt-4 sm:mt-6 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors w-full sm:w-auto"
            onClick={() => router.push("/")}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const planData = travelPlan && typeof travelPlan.travel_plan === "string"
    ? JSON.parse(travelPlan.travel_plan)
    : travelPlan?.travel_plan || { itinerary: [], travel_tips: "", local_food_recommendations: "", estimated_costs: "" };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateForApi = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const startDateForApi = formatDateForApi(startDate);
  const endDateForApi = formatDateForApi(endDate);

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-8 sm:pb-16">
      <div
        className="relative py-12 sm:py-16 mb-6 sm:mb-8 shadow-md bg-cover bg-center"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-teal-400">{city}</h1>
          <p className="text-base sm:text-lg text-gray-300">
            {formatDate(startDate)} - {formatDate(endDate)}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
          <p className={isBlurred ? "text-gray-300 leading-relaxed blur-sm" : "text-gray-300 leading-relaxed"}>
            {travelPlan?.city_description || "Explore the wonders of this destination!"}
          </p>
        </div>

        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-teal-400 flex items-center">
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Your Itinerary
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {planData.itinerary.map((dayPlan: ItineraryDay, index: number) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-teal-900 px-4 py-2 sm:px-6 sm:py-3">
                  <h3 className="font-bold text-lg sm:text-xl">{dayPlan.day}</h3>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-2 sm:mr-4">
                      <div className="w-8 sm:w-12 h-8 sm:h-12 bg-teal-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 sm:w-6 h-4 sm:h-6 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-400 text-sm sm:text-base mb-1">Morning</h4>
                      <p className={index === 0 ? "text-gray-300 text-sm sm:text-base" : isBlurred ? "text-gray-300 text-sm sm:text-base blur-sm" : "text-gray-300 text-sm sm:text-base"}>
                        {dayPlan.morning}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-2 sm:mr-4">
                      <div className="w-8 sm:w-12 h-8 sm:h-12 bg-teal-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 sm:w-6 h-4 sm:h-6 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-400 text-sm sm:text-base mb-1">Afternoon</h4>
                      <p className={index === 0 ? "text-gray-300 text-sm sm:text-base" : isBlurred ? "text-gray-300 text-sm sm:text-base blur-sm" : "text-gray-300 text-sm sm:text-base"}>
                        {dayPlan.afternoon}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-2 sm:mr-4">
                      <div className="w-8 sm:w-12 h-8 sm:h-12 bg-teal-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 sm:w-6 h-4 sm:h-6 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www

.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-400 text-sm sm:text-base mb-1">Evening</h4>
                      <p className={index === 0 ? "text-gray-300 text-sm sm:text-base" : isBlurred ? "text-gray-300 text-sm sm:text-base blur-sm" : "text-gray-300 text-sm sm:text-base"}>
                        {dayPlan.evening}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400 flex items-center">
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Travel Tips
            </h2>
            <p className={isBlurred ? "text-gray-300 leading-relaxed blur-sm" : "text-gray-300 leading-relaxed text-sm sm:text-base"}>
              {planData.travel_tips || "No travel tips available."}
            </p>
          </div>

          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400 flex items-center">
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Local Food
            </h2>
            <p className={isBlurred ? "text-gray-300 leading-relaxed blur-sm" : "text-gray-300 leading-relaxed text-sm sm:text-base"}>
              {planData.local_food_recommendations || "No food recommendations available."}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400 flex items-center">
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Hotel Recommendations
          </h2>
          <div className={isBlurred ? "blur-sm" : ""}>
            <HotelRecommendations
              city={city}
              startDate={startDateForApi}
              endDate={endDateForApi}
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-8 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400 flex items-center">
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Estimated Costs
          </h2>
          <p className={isBlurred ? "text-gray-300 leading-relaxed blur-sm" : "text-gray-300 leading-relaxed text-sm sm:text-base"}>
            {planData.estimated_costs || "No cost estimates available."}
          </p>
        </div>

        <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors shadow-lg flex items-center w-full sm:w-auto"
            onClick={handleDownload}
          >
            <svg
              className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Print Itinerary
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors shadow-lg flex items-center w-full sm:w-auto"
            onClick={handleShare}
          >
            <svg
              className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share Plan
          </button>
          {isBlurred ? (
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors shadow-lg flex items-center w-full sm:w-auto"
              onClick={handleUnblur}
            >
              <svg
                className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Unlock
            </button>
          ) : (
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors shadow-lg flex items-center w-full sm:w-auto"
              onClick={handleBackToHome}
            >
              <svg
                className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}