/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "react-toastify";

export const handleApiError = async (response: Response) => {
    try {
        const data = await response.json();

        // Handle the specific error format you mentioned
        if (data.status === "error" && data.detail && Array.isArray(data.detail) && data.detail.length > 0) {
            const message = data.detail[0].message;
            toast.error(message);
            return message;
        }


        // Fallback to status text
        const errorMessage = response.statusText || `Error: ${response.status}`;
        toast.error(errorMessage);
        return errorMessage;
    } catch (e) {
        // If JSON parsing fails, use status text
        const errorMessage = response.statusText || `Error: ${response.status}`;
        toast.error(errorMessage);
        return errorMessage;
    }
};