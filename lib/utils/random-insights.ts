import { OpportunityRow } from "@/lib/types";

/**
 * Simple string hash function to generate deterministic scores.
 * Same product always returns the same scores.
 */
function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

/**
 * Seeded pseudo-random number generator (mulberry32).
 * Returns a function that produces deterministic values between 0 and 1.
 */
function seededRandom(seed: number) {
    return function () {
        seed |= 0;
        seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

/**
 * Generate deterministic insights for a product.
 * Same category + product combination always produces the same scores.
 */
export function generateInsights(category: string, product: string): OpportunityRow {
    const seed = hashCode(`${category}::${product}`);
    const rand = seededRandom(seed);

    const r = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

    return {
        Category: category,
        Product: product,
        DemandScore: r(45, 95),
        CompetitionScore: r(25, 85),
        GrowthScore: r(40, 92),
        UnitEconomicsScore: r(35, 88),
        DifferentiationScore: r(30, 90),
        ComplianceRiskScore: r(10, 65),
        MinPrice: r(12, 55),
        MaxPrice: r(55, 180),
        SearchVolume: r(800, 65000),
        RevenuePotential: r(40000, 600000)
    };
}
