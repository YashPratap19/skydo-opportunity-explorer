import Papa from "papaparse";
import { OpportunityRow } from "./types";

export async function parseOpportunities(): Promise<OpportunityRow[]> {
    try {
        const response = await fetch("/data/opportunities.csv");
        const csvText = await response.text();

        const { data } = Papa.parse<OpportunityRow>(csvText, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true, // auto convert numbers
        });

        return data;
    } catch (error) {
        console.error("Failed to parse opportunities", error);
        return [];
    }
}
