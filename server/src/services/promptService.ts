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
        console.log(question, id);
        const result = await incidentResponseDbPool.query('UPDATE pre_prompts SET question = $1 WHERE id = $2 RETURNING *', [question, id]);
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

export const updatePrePromptOptions = async (optionId: string, optionText: string, severity: string) => {
    try {
        const result = await incidentResponseDbPool.query('UPDATE pre_prompt_options SET option_text = $1, severity_level = $2 WHERE id = $3 RETURNING *', [optionText, severity, optionId]);
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
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error("Could not get incident responses");
    }
}

export const updateIncidentResponse = async (incidentType: string, incidentDetails: string, id: string) => {
    try {
        const result = await incidentResponseDbPool.query('UPDATE incident_responses SET incident_type = $1, incident_details = $2 WHERE id = $3', [incidentType, incidentDetails, id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not update incident response");
    }
}

export const deleteIncidentResponse = async (id: string) => {
    try {
        const result = await incidentResponseDbPool.query('DELETE FROM incident_responses WHERE id = $1', [id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not delete incident response");
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
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not get prompts");
    }
}

export const updatePrompt = async (severity: string, title: string, description: string, id: string) => {
    try {
        const result = await incidentResponseDbPool.query('UPDATE prompts SET severity = $1, title = $2, description = $3 WHERE id = $4 RETURNING *', [severity, title, description, id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not update prompt");
    }
}

export const deletePrompt = async (id: string) => {
    try {
        const result = await incidentResponseDbPool.query('DELETE FROM prompts WHERE id = $1', [id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not delete prompt");
    }
}

export const getSeverityLevels = async () => {
    try {
        const result = await incidentResponseDbPool.query('SELECT * FROM severity_levels');
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error("Could not get severity levels");
    }
}

export const updateSeverityLevels = async (id: string, min: number, max: number) => {
    try {
        const result = await incidentResponseDbPool.query('UPDATE severity_levels SET min_score = $1, max_score = $2 WHERE id = $3', [min, max, id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Could not update severity levels");
    }
}