import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export const getIpAddress = () => {
    const [ip, setIp] = React.useState("");

    useEffect(() => {
        const getIp = async () => {
            try {
                const value = await AsyncStorage.getItem("ipAddress");
                if (value !== null) {
                    setIp(JSON.parse(value));
                }
            } catch (e) {
                console.log(e);
                return;
            }
        };
        getIp();
    }, []);

    return ip;
}