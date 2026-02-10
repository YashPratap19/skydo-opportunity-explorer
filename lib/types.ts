// Consolidated Type Definitions

export interface OpportunityRow {
    Category: string;
    Product: string;
    DemandScore: number;
    GrowthScore: number;
    CompetitionScore: number;
    UnitEconomicsScore: number;
    DifferentiationScore: number;
    ComplianceRiskScore: number;
    MinPrice?: number;
    MaxPrice?: number;
    SearchVolume?: number;
    RevenuePotential?: number;
}

export interface LeadData {
    name: string;
    email: string;
    phone: string;
    selectedProduct?: string;
    category?: string;
}
