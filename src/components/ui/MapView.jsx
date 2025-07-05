// import { AppleMaps, GoogleMaps } from "expo-maps";
// import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
// import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
// import { Platform, Text } from "react-native";

// export default function MapView({ latitude, longitude }) {
//   console.log(latitude, longitude);

//   const lat = latitude ?? 37.8199;
//   const long = longitude ?? -122.4783;

//   const polylineCoordinates = [{ latitude: lat, longitude: long }];

//   if (Platform.OS === "ios") {
//     return (
//       <AppleMaps.View
//         style={{ flex: 1 }}
//         cameraPosition={{
//           coordinates: {
//             latitude: lat,
//             longitude: long,
//           },
//           zoom: 12,
//         }}
//         annotations={annotations}
//         polylines={[
//           {
//             color: "blue",
//             width: 5,
//             coordinates: polylineCoordinates,
//           },
//         ]}
//         properties={{
//           isTrafficEnabled: false,
//           mapType: AppleMapsMapType.STANDARD,
//           selectionEnabled: true,
//         }}
//       />
//     );
//   } else if (Platform.OS === "android") {
//     return (
//       <GoogleMaps.View
//         style={{ flex: 1 }}
//         cameraPosition={{
//           coordinates: {
//             latitude: lat,
//             longitude: long,
//           },
//           zoom: 12,
//         }}
//         polylines={[
//           {
//             color: "red",
//             width: 5,
//             coordinates: polylineCoordinates,
//           },
//         ]}
//         markers={markers.map((marker) => ({
//           coordinates: {
//             latitude: marker.latitude,
//             longitude: marker.longitude,
//           },
//           title: marker.name,
//           snippet: `Posts: ${marker.postCount} | Rating: ${marker.rating}`,
//         }))}
//         properties={{
//           isBuildingEnabled: true,
//           isIndoorEnabled: true,
//           mapType: GoogleMapsMapType.NORMAL,
//           selectionEnabled: true,
//           isMyLocationEnabled: false,
//           isTrafficEnabled: true,
//         }}
//       />
//     );
//   } else {
//     return <Text>Maps are only available on Android and iOS</Text>;
//   }
// }

// const markers = [
//   {
//     id: 1,
//     name: "Kalamary",
//     latitude: 33.8121,
//     longitude: -117.919,
//     postCount: 56,
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     name: "Home Chef",
//     latitude: 33.8155,
//     longitude: -117.922,
//     postCount: 34,
//     rating: 4.6,
//   },
//   {
//     id: 3,
//     name: "Burger Zone",
//     latitude: 33.82,
//     longitude: -117.918,
//     postCount: 78,
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     name: "Sushi Place",
//     latitude: 33.81,
//     longitude: -117.915,
//     postCount: 23,
//     rating: 4.3,
//   },
//   {
//     id: 5,
//     name: "Pasta Paradise",
//     latitude: 33.813,
//     longitude: -117.917,
//     postCount: 62,
//     rating: 4.9,
//   },
//   {
//     id: 6,
//     name: "Taco Heaven",
//     latitude: 33.8172,
//     longitude: -117.92,
//     postCount: 45,
//     rating: 4.5,
//   },
// ];

// const annotations = [
//   {
//     coordinates: { latitude: 37.8199, longitude: -122.4783 },
//     title: "Location Name",
//     text: "Location Description",
//     textColor: "white",
//     backgroundColor: "black",
//   },
// ];

import { decode } from "@mapbox/polyline";
import * as Location from "expo-location";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "../../lib/tailwind";
import { newMarker } from "../../utils/marker";

export default function MapView({ latitude, longitude }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Memoized destination coordinates
  const destination = useMemo(
    () => ({
      latitude: latitude,
      longitude: longitude,
    }),
    [latitude, longitude]
  );

  // Get user's current location
  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (!isMounted) return;

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setIsLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (isMounted) {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      } catch (error) {
        if (isMounted) {
          setErrorMsg("Could not get your location");
          console.error("Location error:", error);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    getLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch directions with error handling and cleanup
  const fetchDirections = useCallback(async (startLoc, endLoc) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${endLoc.latitude},${endLoc.longitude}&key=AIzaSyARXa6r8AXKRaoeWqyesQNBI8Y3EUEWSnY`
      );

      if (!response.ok) throw new Error("Directions request failed");

      const json = await response.json();

      if (json.routes?.length) {
        const points = decode(json.routes[0].overview_polyline.points);
        const coords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRouteCoordinates(coords);
      }
    } catch (error) {
      console.error("Directions error:", error);
      setRouteCoordinates([]); // Clear route if error occurs
    }
  }, []);

  // Fetch directions when locations change
  useEffect(() => {
    if (currentLocation && latitude && longitude) {
      fetchDirections(currentLocation, destination);
    }
  }, [currentLocation, latitude, longitude, fetchDirections, destination]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={"#ED6237"} size="large" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  // Error state
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  // No location state
  if (!currentLocation) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Location not available</Text>
      </View>
    );
  }

  // Platform-specific map rendering
  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={styles.map}
        cameraPosition={{
          coordinates: currentLocation,
          zoom: 14,
          heading: 0,
          pitch: 0,
        }}
        annotations={[
          {
            coordinates: currentLocation,
            title: "Your Location",
            text: "You are here",
            textColor: "white",
            backgroundColor: "#4285F4", // Google blue
          },
          {
            coordinates: destination,
            title: "Destination",
            text: "Your destination",
            textColor: "white",
            backgroundColor: "#EA4335", // Google red
          },
        ]}
        polylines={
          routeCoordinates.length
            ? [
                {
                  color: "#ED6237",
                  width: 4,
                  coordinates: routeCoordinates,
                },
              ]
            : []
        }
        properties={{
          isTrafficEnabled: true,
          mapType: AppleMapsMapType.SATELLITE,
          showsUserLocation: true,
          showsCompass: true,
          showsScale: true,
        }}
      />
    );
  } else if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={styles.map}
        cameraPosition={{
          coordinates: currentLocation,
          zoom: 16,
          heading: 0,
          pitch: 0,
        }}
        polylines={
          routeCoordinates.length
            ? [
                {
                  color: "#ED6237",
                  width: 10,
                  coordinates: routeCoordinates,
                },
              ]
            : []
        }
        markers={[
          // {
          //   coordinates: currentLocation,
          //   title: "Your Location",
          //   snippet: "You are here",
          //   pinColor: "#ED6237",
          // },
          {
            coordinates: destination,
            title: "Destination",
            snippet: "Your destination",
            pinColor: "#ED6237",
          },
          // {
          //   coordinates: newMarker,
          //   title: "Destination",
          //   snippet: "Your destination",
          //   pinColor: "#ED6237",
          // },
          ...newMarker.map((marker) => ({
            coordinates: {
              latitude: marker.latitude,
              longitude: marker.longitude,
            },
            pinColor: "#007AFF",
          })),
        ]}
        onMarkerClick={() => {
          Alert.alert(
            "Kalamari",
            "The remaining tasks must be done after receiving the data from the backend. Thank you"
          );
        }}
        properties={{
          isTrafficEnabled: true,
          mapType: GoogleMapsMapType.TERRAIN,
          isMyLocationEnabled: true,
          zoomControlsEnabled: true,
          compassEnabled: true,
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Maps are only available on Android and iOS</Text>
      <View style={tw`flex-1 justify-center items-center`}>
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            setIsVisible(false);
          }}
        >
          <View style={tw`flex-1 bg-black/40 justify-center items-center`}>
            <View style={tw`bg-white w-80 rounded-xl p-6 items-center`}>
              {/* <View style={tw`bg-gray-200 p-4 rounded-full mb-4`}>
              <AntDesign name="checkcircle" size={32} color="black" />
            </View> */}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  map: {
    flex: 1,
    zIndex: 4,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    borderRadius: 10,
  },
  loadingText: {
    marginTop: 10,
    color: "#333",
  },
  errorText: {
    color: "#EA4335",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
