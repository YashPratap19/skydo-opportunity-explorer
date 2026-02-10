import { OpportunityRow } from "@/lib/types";

export function generateRandomInsights(category: string, product: string): OpportunityRow {
    // Helper to get random number between min and max
    const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    return {
        Category: category,
        Product: product,
        DemandScore: r(60, 95),
        CompetitionScore: r(30, 80),
        GrowthScore: r(50, 90),
        UnitEconomicsScore: r(40, 85),
        DifferentiationScore: r(30, 90),
        ComplianceRiskScore: r(10, 60),
        MinPrice: r(15, 50),
        MaxPrice: r(50, 150),
        SearchVolume: r(1000, 50000),
        RevenuePotential: r(50000, 500000)
    };
}
