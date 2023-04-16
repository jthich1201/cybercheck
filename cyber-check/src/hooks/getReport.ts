import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Report } from "../types/Report";

export const getReport = () => {
    const [reportId, setReportId] = useState();

    useEffect(() => {
        const getReport = async () => {
            try {
                const value = await AsyncStorage.getItem("reportId");
                if (value != null) {
                    setReportId(JSON.parse(value));
                }
            } catch (e) {
                console.log(e);
                return;
            }
        };
        getReport();
    }, []);

    return reportId;
}