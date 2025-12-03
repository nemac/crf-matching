/**
 * API Configuration for AWS Lambda Functions
 *
 * Update the API_BASE_URL after deploying to AWS API Gateway
 */

// TODO: Replace this with your actual API Gateway URL after deployment
// Example: https://abc123def.execute-api.us-east-1.amazonaws.com/prod
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://YOUR_API_GATEWAY_URL/prod';

export const API_ENDPOINTS = {
  generateMagicLink: `${API_BASE_URL}/generate-link`,
  validateToken: `${API_BASE_URL}/validate-token`,
  updateOrganization: `${API_BASE_URL}/update-organization`,
};

/**
 * Generate a magic link for the given email
 * @param {string} email - User's email address
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function generateMagicLink(email) {
  try {
    // const response = await fetch(API_ENDPOINTS.generateMagicLink, {
    const response = await fetch("https://f3dbs4mb2n3ghocrg2co2d5wcy0npmby.lambda-url.us-east-1.on.aws/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate magic link');
    }

    return data;
  } catch (error) {
    console.error('Error generating magic link:', error);
    throw error;
  }
}

/**
 * Validate a token and fetch organization data
 * @param {string} token - Magic link token
 * @returns {Promise<{success: boolean, data: Object}>}
 */
export async function validateToken(token) {
  try {
    const response = await fetch(`${API_ENDPOINTS.validateToken}?token=${encodeURIComponent(token)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Invalid or expired token');
    }

    return data;
  } catch (error) {
    console.error('Error validating token:', error);
    throw error;
  }
}

/**
 * Update organization data
 * @param {string} token - Magic link token
 * @param {Object} updates - Fields to update
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function updateOrganization(token, updates) {
  try {
    const response = await fetch(API_ENDPOINTS.updateOrganization, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, updates }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update organization');
    }

    return data;
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
}