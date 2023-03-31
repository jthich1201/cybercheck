import incidentResponseDbPool from "../db/incidentResponseDb";

export const createPrePrompt = async (question: string) => {
    try {
        const result = await incidentResponseDbPool.query('INSERT INTO pre_prompts (question) VALUES ($1) RETURNING *', [question]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not create pre prompt");
    }
};

export const getPrePrompts = async () => {
    try {
        const result = await incidentResponseDbPool.query('SELECT * FROM pre_prompts');
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not get pre prompts");
    }
}

export const createPrePromptOptions = async (option: string, prePromptId: number) => {
    try {
        const result = await incidentResponseDbPool.query('INSERT INTO pre_prompt_options (option_text, pre_prompt_id) VALUES ($1, $2) RETURNING *', [option, prePromptId]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not create pre prompt option");
    }
}

export const getPrePromptOptions = async (prePromptId: string) => {
    try {
        const result = await incidentResponseDbPool.query('SELECT * FROM pre_prompt_options WHERE pre_prompt_id = $1', [prePromptId]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not get pre prompt options");
    }
}

export const createIncidentResponse = async (incidentType: string, incidentDetails: string) => {
    try {
        const result = await incidentResponseDbPool.query('INSERT INTO incident_responses (incident_type, incident_details) VALUES ($1, $2) RETURNING *', [incidentType, incidentDetails]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not create incident response");
    }
}

export const getIncidentResponses = async () => {
    try {
        const result = await incidentResponseDbPool.query('SELECT * FROM incident_responses');
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Could not get incident responses");
    }
}

export const createPrompt = async (severity: string, title: string, description: string, incidentResponseId: string) => {
    try {
        const result = await incidentResponseDbPool.query('INSERT INTO prompts (severity, title, description, incident_response_id) VALUES ($1, $2, $3, $4) RETURNING *', [severity, title, description, incidentResponseId]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not create prompt");
    }
}

export const getPrompts = async (incidentResponseId: string) => {
    try {
        const result = await incidentResponseDbPool.query('SELECT * FROM prompts WHERE incident_response_id = $1', [incidentResponseId]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Could not get prompts");
    }
}
