import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { User } from "../types/User";

export const getUser = () => {
    const [user, setUser] = React.useState<User>();

    useEffect(() => {
        const getUser = async () => {
            try {
                const value = await AsyncStorage.getItem("user");
                if (value !== null) {
                    setUser(JSON.parse(value));
                }
            } catch (e) {
                console.log(e);
                return;
            }
        };
        getUser();
    }, []);

    return user;
}