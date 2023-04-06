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

export const updatePrePrompt = async (question: string, id: string) => {
    try {
        const result = await incidentResponseDbPool.query('UPDATE pre_prompts SET question = $1 WHERE id = $2', [question, id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not update pre prompt");
    }
}

export const deletePrePrompt = async (id: string) => {
    try {
        const result = await incidentResponseDbPool.query('DELETE FROM pre_prompts WHERE id = $1', [id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not delete pre prompt");
    }
}

export const createPrePromptOptions = async (option: string, prePromptId: number, severity: string) => {
    try {
        const result = await incidentResponseDbPool.query('INSERT INTO pre_prompt_options (option_text, pre_prompt_id, severity_level) VALUES ($1, $2, $3) RETURNING *', [option, prePromptId, severity]);
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

export const updatePrePromptOptions = async (optionId: string, optionText: string) => {
    try {
        const result = await incidentResponseDbPool.query('UPDATE pre_prompt_options SET option_text = $1 WHERE id = $2', [optionText, optionId]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not update pre prompt option");
    }
}

export const deletePrePromptOptions = async (optionId: string) => {
    try {
        const result = await incidentResponseDbPool.query('DELETE FROM pre_prompt_options WHERE id = $1', [optionId]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not delete pre prompt option");
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

export const getSeverityLevel = async (id: string) => {
    try {
        const result = await incidentResponseDbPool.query('SELECT * FROM severity_levels where id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Could not get severity levels");
    }
}

export const updateSeverityLevels = async (id: string, min: number, max: number) => {
    try {
        const result = await incidentResponseDbPool.query('UPDATE severity_levels SET min = $1, max = $2 WHERE id = $3', [min, max, id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not update severity levels");
    }
}