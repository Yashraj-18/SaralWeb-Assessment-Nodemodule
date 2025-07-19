function processData(data) {
  // Initialize counters and arrays
  let totalCodes = data.length;
  let validCodes = 0;
  let invalidCodes = 0;
  let normalizedValidCodes = [];

  // Process each product code
  for (let i = 0; i < data.length; i++) {
    const code = data[i];
    
    // Check if the code is valid
    if (isValidProductCode(code)) {
      validCodes++;
      // Normalize the code by converting letters to uppercase
      const normalizedCode = normalizeCode(code);
      normalizedValidCodes.push(normalizedCode);
    } else {
      invalidCodes++;
    }
  }

  // Sort the normalized valid codes alphabetically
  normalizedValidCodes.sort();

  // Return the summary object
  return {
    totalCodes: totalCodes,
    validCodes: validCodes,
    invalidCodes: invalidCodes,
    normalizedValidCodes: normalizedValidCodes
  };
}

/**
 * Checks if a product code is valid
 * Valid format: exactly 7 characters - 3 letters followed by 4 digits
 * @param {string} code - The product code to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidProductCode(code) {
  // Check if code is a string and has exactly 7 characters
  if (typeof code !== 'string' || code.length !== 7) {
    return false;
  }

  // Check first 3 characters are letters (A-Z, case insensitive)
  for (let i = 0; i < 3; i++) {
    const char = code[i];
    if (!isLetter(char)) {
      return false;
    }
  }

  // Check last 4 characters are digits (0-9)
  for (let i = 3; i < 7; i++) {
    const char = code[i];
    if (!isDigit(char)) {
      return false;
    }
  }

  return true;
}

/**
 * Normalizes a valid product code by converting letters to uppercase
 * @param {string} code - The valid product code to normalize
 * @returns {string} - The normalized code with uppercase letters
 */
function normalizeCode(code) {
  let normalized = '';
  
  // Convert first 3 characters to uppercase
  for (let i = 0; i < 3; i++) {
    normalized += code[i].toUpperCase();
  }
  
  // Keep last 4 digits as they are
  for (let i = 3; i < 7; i++) {
    normalized += code[i];
  }
  
  return normalized;
}

/**
 * Checks if a character is a letter (A-Z, case insensitive)
 * @param {string} char - Single character to check
 * @returns {boolean} - True if letter, false otherwise
 */
function isLetter(char) {
  const charCode = char.charCodeAt(0);
  return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
}

/**
 * Checks if a character is a digit (0-9)
 * @param {string} char - Single character to check
 * @returns {boolean} - True if digit, false otherwise
 */
function isDigit(char) {
  const charCode = char.charCodeAt(0);
  return charCode >= 48 && charCode <= 57;
}

module.exports = { processData }; 