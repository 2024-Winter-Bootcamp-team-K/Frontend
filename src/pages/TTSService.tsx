const fetchTTS = async (sentence: string, taskId: string) => {
    try {
        const response = await fetch("https://ailibi.click/api/v1/tts/change_sound", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sentence, task_id: taskId }),
        });

        if (!response.ok) {
            throw new Error("Failed to start TTS task");
        }

        const { task_id } = await response.json();

        return await fetchTTSAudio(task_id);
    } catch (error) {
        console.error("Error in TTS:", error);
        throw error;
    }
};

const fetchTTSAudio = async (taskId: string): Promise<string> => {
    try {
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
            const response = await fetch(`https://ailibi.click/api/v1/tts/${taskId}`, { method: "GET" });
            const result = await response.json();

            if (response.ok && result.status === "SUCCESS") {
                return result.audio_base64;
            }

            if (result.status === "PENDING") {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                attempts++;
            } else {
                throw new Error("TTS failed or unexpected status");
            }
        }

        throw new Error("TTS task timed out");
    } catch (error) {
        console.error("Error fetching TTS audio:", error);
        throw error;
    }
};

export default fetchTTS; // default export
