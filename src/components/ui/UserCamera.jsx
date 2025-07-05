import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../lib/tailwind";

export default function UserCamera({ onClose }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [flashMode, setFlashMode] = useState("off");
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const cameraRef = useRef(null);

  // Request camera and media library permissions
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setGalleryPermission(status === "granted");
    })();
  }, []);

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to access the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={tw` bg-orange items-center px-5 py-2 rounded`}
        >
          <Text style={tw`  text-white`}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlashMode = () => {
    setFlashMode((current) => {
      if (current === "off") return "on";
      if (current === "on") return "auto";
      return "off";
    });
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
          exif: true,
        });
        setCapturedImage(photo);
        setPreviewVisible(true);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const savePhoto = async () => {
    if (capturedImage && galleryPermission) {
      setIsSaving(true);
      try {
        const asset = await MediaLibrary.createAssetAsync(capturedImage.uri);
        setPhotos([...photos, asset]);
        setPreviewVisible(false);
        alert("Photo saved to gallery!");
      } catch (error) {
        console.error("Error saving photo:", error);
        alert("Failed to save photo");
      } finally {
        setIsSaving(false);
      }
    } else {
      alert("Please grant gallery permissions to save photos");
    }
  };

  const discardPhoto = () => {
    setPreviewVisible(false);
    setCapturedImage(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!previewVisible ? (
          <>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
              flashMode={flashMode}
            >
              <TouchableOpacity
                style={tw`absolute top-12 left-5 bg-white/70 p-1 rounded`}
                onPress={onClose}
              >
                {/* <Ionicons name="left-arrow" size={24} color="white" /> */}
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={34}
                  color="black"
                />
              </TouchableOpacity>

              <View style={styles.bottomControls}>
                <TouchableOpacity
                  style={styles.galleryButton}
                  onPress={() => setPreviewVisible(true)}
                >
                  {photos.length > 0 ? (
                    <Image
                      source={{ uri: photos[photos.length - 1].uri }}
                      style={styles.galleryThumbnail}
                    />
                  ) : (
                    <View style={styles.emptyGallery}>
                      <Ionicons name="images" size={24} color="white" />
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                >
                  <Ionicons name="camera-reverse" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </CameraView>
          </>
        ) : (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: capturedImage.uri }}
              style={styles.previewImage}
            />
            <View style={styles.previewControls}>
              <TouchableOpacity
                style={styles.discardButton}
                onPress={discardPhoto}
              >
                <Ionicons name="trash" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={savePhoto}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Ionicons name="save" size={30} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Gallery Modal */}
      <Modal
        visible={previewVisible && photos.length > 0}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setPreviewVisible(false)}
          >
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.galleryContainer}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image
                  source={{ uri: photo.uri }}
                  style={styles.galleryImage}
                />
                <Text style={styles.photoDate}>
                  {new Date(photo.creationTime).toLocaleString()}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  permissionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  topControls: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    right: 20,
    zIndex: 1,
  },
  bottomControls: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 50 : 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  flashButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 30,
    padding: 10,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  galleryThumbnail: {
    width: "100%",
    height: "100%",
  },
  emptyGallery: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  flipButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 30,
    padding: 10,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  previewImage: {
    flex: 1,
    resizeMode: "contain",
  },
  previewControls: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  discardButton: {
    backgroundColor: "rgba(255,0,0,0.5)",
    borderRadius: 30,
    padding: 15,
  },
  saveButton: {
    backgroundColor: "rgba(0,255,0,0.5)",
    borderRadius: 30,
    padding: 15,
    width: 60,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  closeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 30,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 5,
  },
  galleryContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  galleryImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  photoDate: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});

// import { CameraView, useCameraPermissions } from "expo-camera";
// import { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import tw from "../../lib/tailwind";

// export default function UserCamera() {
//   const [facing, setFacing] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to show the camera
//         </Text>
//         <TouchableOpacity onPress={requestPermission}>
//           <Text style={tw`text-2xl text-red-500`}>permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView style={styles.camera} facing={facing}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   message: {
//     textAlign: "center",
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "transparent",
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: "flex-end",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
// });

// import { CameraView, useCameraPermissions } from "expo-camera";
// import { useState } from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import tw from "../../lib/tailwind";

// export default function UserCamera({ onClose }) {
//   const [facing, setFacing] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();

//   if (!permission) return <View />;
//   if (!permission.granted) {
//     return (
//       <View style={tw`flex-1 justify-center items-center`}>
//         <Text style={tw`text-center mb-4 text-base`}>
//           We need your permission to show the camera
//         </Text>
//         <TouchableOpacity onPress={requestPermission}>
//           <Text style={tw`text-2xl text-red-500`}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   }

//   return (
//     <View style={tw`flex-1`}>
//       <CameraView style={tw`flex-1`} facing={facing} />
//       <TouchableOpacity
//         style={tw`absolute bottom-12 self-center bg-black/50 px-5 py-3 rounded-xl`}
//         onPress={toggleCameraFacing}
//       >
//         <Text style={tw`text-white text-lg font-bold`}>Flip Camera</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={tw`absolute top-12 right-5 bg-white/70 px-4 py-2 rounded`}
//         onPress={onClose}
//       >
//         <Text style={tw`text-black font-bold`}>Close</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
