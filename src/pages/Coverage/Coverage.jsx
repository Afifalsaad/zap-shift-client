import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaSearch } from "react-icons/fa";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const bangladeshLocation = [23.685, 90.3563];
  const serviceCenter = useLoaderData();
  const mapRef = useRef();
  console.log(serviceCenter);

  const handleSearch = (e) => {
    e.preventDefault();

    const location = e.target.location.value;
    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-secondary text-4xl font-bold">
        We are available in 64 districts.
      </h2>
      <div>
        <form onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              name="location"
              type="search"
              className="grow"
              placeholder="Search"
            />
          </label>
        </form>
      </div>
      {/* Map */}
      <div className="h-[800px]">
        <MapContainer
          className="h-[800px]"
          center={bangladeshLocation}
          zoom={7}
          scrollWheelZoom={false}
          ref={mapRef}
          >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenter.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              >
              <Popup>
                <strong>{center.district}</strong> <br /> Service Ares:{" "}
                {center.covered_area.join(", ")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
