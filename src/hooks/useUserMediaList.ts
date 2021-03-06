import React, {useEffect, useRef} from "react";

const useUserMediaList = () => {

    useEffect(() => {
        // REFERENCE: https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/enumerateDevices
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
            return;
        }
        // List cameras and microphones.

        navigator.mediaDevices.enumerateDevices()
            .then(function (devices) {
                devices.forEach(function (device) {
                    console.log(device.kind + ": " + device.label +
                        " id = " + device.deviceId);
                });
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }, [])
}

export default useUserMediaList