import { mediaDevices } from "react-native-webrtc";

export default class Utils {
  static async getStream(isVideoCall) {

let isFront = true;
const sourceInfos = await mediaDevices.enumerateDevices()
  console.log(sourceInfos);
  let videoSourceId;
  for (let i = 0; i < sourceInfos.length; i++) {
    const sourceInfo = sourceInfos[i];
    if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
      videoSourceId = sourceInfo.deviceId;
    }
  }
  const stream = await mediaDevices.getUserMedia({
    audio: true,
    video: isVideoCall ? {
      width: 640,
      height: 480,
      frameRate: 30,
      facingMode: (isFront ? "user" : "environment"),
      deviceId: videoSourceId
    }: false
  })
  if(typeof stream != 'boolean') return stream
  return null;

}
}