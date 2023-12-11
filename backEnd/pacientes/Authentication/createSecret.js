import crypto from "crypto";
import fs from "fs";
import path from "path";

/**
 * Generates a random secret key and updates the .env file if the SECRET_KEY is not already present.
 */
export async function createSecret() {
    // Generate a random 32-byte (256-bit) secret key
    const secret = crypto.randomBytes(32).toString('hex');

    // Define the path to the .env file
    const filePath = path.join('.env');

    // Read the content of the .env file
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Check if the .env file already contains the SECRET_KEY
    if (fileData.indexOf('SECRET_KEY') === -1) {
        // Append the SECRET_KEY to the existing content
        const updateData = fileData + `\nSECRET_KEY=${secret}`;

        // Write the updated content back to the .env file
        fs.writeFileSync('.env', updateData);
    }
    // If SECRET_KEY is already present, no update is needed
}
