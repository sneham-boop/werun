import React, { useState, useEffect } from "react";
import GoogleMap from "../GoogleMap";
import AutoComplete from "./AutoComplete";
import Markers from "../Map/Markers";
import "../../styles/Map.css";

const ShowHikeRoute = ({ zoom = 10, fromRef, toRef, setRunData }) => {
  const [mapAPILoaded, setMapAPILoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [mapAPI, setMapAPI] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [distance, setDistance] = useState(null);

  const handleApiLoaded = (map, maps) => {
    setMapAPILoaded(true);
    setMap(map);
    setMapAPI(maps);
    // function initialize() {
    //   // map = new maps.Map(document.getElementById("check-route-map"), {
    //   //   mapId: "4493db09864aa939",
    //   //   center: new maps.LatLng(43.6532, -79.3832),
    //   //   zoom: 13,
    //   //   mapTypeId: maps.MapTypeId.ROADMAP,
    //   //   disableDefaultUI: true,
    //   // });

    //   let directionsDisplay = new maps.DirectionsRenderer();
    //   let directionsService = new maps.DirectionsService();
    //   calculateAndDisplayRoute(
    //     new maps.LatLng(from.lat, from.lng),
    //     new maps.LatLng(to.lat, to.lng),
    //     directionsService,
    //     directionsDisplay
    //   );
    //   directionsDisplay.setMap(map);
    //   directionsDisplay.setOptions({
    //     polylineOptions: {
    //       strokeColor: "#80B918CC",
    //       strokeWeight: "8",
    //     },
    //   });
    //   directionsDisplay.setPanel(document.getElementById("check-route-map"));
    // }
    // initialize();
    // function calculateAndDisplayRoute(
    //   start,
    //   end,
    //   directionsService,
    //   directionsDisplay
    // ) {
    //   directionsService.route(
    //     {
    //       origin: start,
    //       destination: end,
    //       travelMode: maps.TravelMode.WALKING,
    //     },
    //     function (response, status) {
    //       if (status === maps.DirectionsStatus.OK) {
    //         directionsDisplay.setDirections(response);
    //         // console.log(response.routes[0].legs[0].distance.text);
    //       } else {
    //         window.alert("Directions request failed due to " + status);
    //       }
    //     }
    //   );
    // }
  };

  useEffect(() => {
    if (mapAPILoaded && from && to) showRouteOnMap(map, mapAPI);
    if (distance) {
      setRunData((prev) => {
        return {
          ...prev,
          lat: from.lat,
          lng: from.lng,
          address: from.formatted_address,
          lat_to: to.lat,
          lng_to: to.lng,
          address_to: to.formatted_address,
          distance: distance
        };
      });
    }
  }, [from, to, distance]);

  function showRouteOnMap(map, maps) {
    // map = new maps.Map(document.getElementById("check-route-map"), {
    //   mapId: "4493db09864aa939",
    //   center: new maps.LatLng(43.6532, -79.3832),
    //   zoom: 13,
    //   mapTypeId: maps.MapTypeId.ROADMAP,
    //   disableDefaultUI: true,
    // });

    let directionsDisplay = new maps.DirectionsRenderer();
    let directionsService = new maps.DirectionsService();
    calculateAndDisplayRoute(
      maps,
      new maps.LatLng(from.lat, from.lng),
      new maps.LatLng(to.lat, to.lng),
      directionsService,
      directionsDisplay
    );
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
      polylineOptions: {
        strokeColor: "#80B918CC",
        strokeWeight: "8",
      },
    });
    directionsDisplay.setPanel(document.getElementById("check-route-map"));
  }

  function calculateAndDisplayRoute(
    maps,
    start,
    end,
    directionsService,
    directionsDisplay
  ) {
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: maps.TravelMode.WALKING,
      },
      function (response, status) {
        if (status === maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          setDistance(response.routes[0].legs[0].distance.text);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  return (
    <>
      <div
        id="check-route-map"
        className="map"
        // style={{ width: "500px", height: "500px" }}
      >
        <AutoComplete
          map={map}
          mapAPI={mapAPI}
          locationPlaceHolderText="From"
          setPlace={setFrom}
          locationRef={fromRef}
        />
        <AutoComplete
          map={map}
          mapAPI={mapAPI}
          locationPlaceHolderText="To"
          setPlace={setTo}
          locationRef={toRef}
        />
        <GoogleMap
          defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {from && (
            <Markers
              lat={from.lat}
              lng={from.lng}
              id="From"
              description="Hike starts.."
            />
          )}
          {to && (
            <Markers
              lat={to.lat}
              lng={to.lng}
              id="To"
              description="Hike ends.."
            />
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default ShowHikeRoute;
