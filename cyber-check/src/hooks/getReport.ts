import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Report } from "../types/Report";

export const getReport = () => {
    const [report, setReport] = React.useState<Report>();

    useEffect(() => {
        const getReport = async () => {
            try {
                const value = await AsyncStorage.getItem("reportId");
                if (value !== null) {
                    setReport(JSON.parse(value));
                }
            } catch (e) {
                console.log(e);
                return;
            }
        };
        getReport();
    }, [report]);

    return report;
}