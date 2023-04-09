export interface PrePrompt {
    id: string;
    question: string;
    options: PrePromptOptions[];
};

export interface PrePromptOptions {
    id: string;
    option_text: string;
    pre_prompt_id: string;
    severity_level: string;
};

export interface SeverityLevel {
    id: string;
    name: string;
    min_score: string;
    max_score: string;
};

export interface IncidentResponse {
    id: string;
    incident_type: string;
    incident_details: string;
    prompts: Prompt[];
};

export interface Prompt {
    id: string;
    severity: string;
    title: string;
    description: string;
    incident_response_id: string;
};