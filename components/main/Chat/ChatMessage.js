import React, { useRef, useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { Button } from "react-native-elements";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";

const ChatMessage = (props) => {
    const { message, myId } = props;
    const [isPlaying, setIsPlaying] = useState(false);

    const isMyMessage = () => {
        return message.author === myId;
    };
    const [playbackObject, setPlaybackObject] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);

    useEffect(() => {
        if (playbackObject === null) {
            setPlaybackObject(new Audio.Sound());
        }
    }, []);

    const handleAudioPlayPause = async () => {
        if (playbackObject !== null && playbackStatus === null) {
            await playbackObject.unloadAsync();
            const status = await playbackObject.loadAsync(
                { uri: message.body },
                { shouldPlay: true },
                { isLooping: true },
                { volume: 1.0 }
            );
            setIsPlaying(true);
            return setPlaybackStatus(status);
        }

        // It will pause our audio
        if (playbackStatus.isPlaying) {
            const status = await playbackObject.pauseAsync();
            setIsPlaying(false);
            return setPlaybackStatus(status);
        }

        // It will resume our audio
        if (!playbackStatus.isPlaying) {
            const status = await playbackObject.playAsync();
            await playbackObject.unloadAsync();
            setIsPlaying(true);
            return setPlaybackStatus(status);
        }
    };

    return (
        // <View style={styles.container}>
        //   <View style={[
        //     styles.messageBox, {
        //       backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
        //       marginLeft: isMyMessage() ? 50 : 0,
        //       marginRight: isMyMessage() ? 0 : 50,
        //     }
        //   ]}>
        //     {!isMyMessage() && <Text style={styles.name}>{message.title}</Text>}
        //     <Text style={styles.message}>{message.body}</Text>
        //     <Text style={styles.time}>{moment(message.date).fromNow()}</Text>
        //   </View>
        // </View>

        <View
            style={{
                marginVertical: 5,
                maxWidth: Dimensions.get("window").width / 2 + 10,
                alignSelf: isMyMessage() ? "flex-end" : "flex-start",
            }}
        >
            <View
                style={{
                    borderRadius: 20,
                    backgroundColor: isMyMessage() ? "#DCF8C5" : "#ccc",
                }}
            >
                {(() => {
                    if (
                        message.type === "text" ||
                        message.type === "document"
                    ) {
                        return (
                            <Text
                                style={{
                                    padding: 10,
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                {message.body} {"   "}{" "}
                                <Text style={{ fontSize: 12 }}>
                                    {moment(message.date).fromNow()}
                                </Text>
                            </Text>
                        );
                    } else if (message.type === "photo") {
                        return (
                            <View>
                                <Image
                                    source={{ uri: message.body }}
                                    style={{
                                        width:
                                            Dimensions.get("window").width / 2 +
                                            10,
                                        height: 150,
                                        resizeMode: "stretch",
                                        borderRadius: 30,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        position: "absolute",
                                        bottom: 5,
                                        right: 5,
                                    }}
                                >
                                    {moment(message.date).fromNow()}
                                </Text>
                            </View>
                        );
                    } else if (message.type === "sound") {
                        return (
                            <Button
                                icon={
                                    <Ionicons
                                        name={
                                            isPlaying
                                                ? `ios-volume-high`
                                                : `ios-volume-mute`
                                        }
                                        size={20}
                                    />
                                }
                                title={isPlaying ? `Playing` : `Listen`}
                                onPress={handleAudioPlayPause}
                            />
                        );
                    }
                })()}
            </View>
        </View>
    );
};

export default ChatMessage;
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    messageBox: {
        borderRadius: 5,
        padding: 10,
    },
    name: {
        color: "#0C6157",
        fontWeight: "bold",
        marginBottom: 5,
    },
    message: {},
    time: {
        alignSelf: "flex-end",
        color: "grey",
    },
});
