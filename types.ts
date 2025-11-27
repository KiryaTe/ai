export interface Goals {
  analyze_brand: string;
  output_strategies: string;
}

export interface Reasoning {
  goals: Goals;
  dialog_stage: string;
  plan: string[];
}

export interface ArchetypeData {
  score: number;
  description: string;
}

export interface Archetypes {
  [key: string]: ArchetypeData;
}

export interface Analysis {
  archetypes: Archetypes;
  summary: string;
}

export interface Recommendations {
  strenghten: string[];
  balance: string[];
  add: string[];
}

export interface Insights {
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendations;
  overall_comment: string;
}

export interface StrategyDetails {
  description: string;
  target_audience: string;
  communication_style: string;
  visual_clues: string;
  slogans: string[];
}

export interface Strategy {
  title: string;
  focus: string;
  main_archetype: string;
  supporting_archetypes: string[];
  what_it_improves: string;
  expected_outcome: string;
  details: StrategyDetails;
}

export interface BrandAnalysisData {
  reasoning: Reasoning;
  analysis: Analysis;
  insights: Insights;
  strategies: Strategy[];
  chat_summary: string;
}