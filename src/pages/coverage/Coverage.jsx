import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

function Coverage() {
  const servicesCenters = useLoaderData();
  const mapRef = useRef();
  const position = [23.8103, 90.4125];

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = servicesCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];

      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div className="my-[100px]">
      <div>
        <h2 className="text-5xl mb-5">We are available in 64 districts</h2>
        <div className="mb-5">
          <form onSubmit={handleSubmit}>
            <div className="join">
              <input
                className="input join-item"
                placeholder="location"
                name="location"
              />
              <button className="btn join-item rounded-r-full bg-primary text-secondary">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="h-[800px] ">
          <MapContainer
            className="h-[800px]"
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {servicesCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <strong>{center.city}</strong> <br />
                  Service Area : {center.covered_area.join(" ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Coverage;
