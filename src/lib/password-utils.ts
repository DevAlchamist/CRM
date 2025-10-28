// Password utility functions for employee account creation

/**
 * Generates a secure temporary password for new employees
 * @param length - Length of the password (default: 12)
 * @returns A secure temporary password
 */
export function generateTemporaryPassword(length: number = 12): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  // Ensure at least one character from each category
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest with random characters from all categories
  const allChars = uppercase + lowercase + numbers + symbols;
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password to randomize the position of required characters
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Object with validation results
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  const isValid = errors.length === 0;
  
  // Calculate strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (isValid) {
    if (password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      strength = 'strong';
    } else {
      strength = 'medium';
    }
  }
  
  return {
    isValid,
    errors,
    strength,
  };
}

/**
 * Generates a secure password that meets all requirements
 * @param length - Length of the password (default: 12)
 * @returns A secure password that passes all validation
 */
export function generateSecurePassword(length: number = 12): string {
  let password: string;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    password = generateTemporaryPassword(length);
    attempts++;
  } while (!validatePasswordStrength(password).isValid && attempts < maxAttempts);
  
  return password;
}

/**
 * Formats password for display (shows first 2 and last 2 characters)
 * @param password - Password to format
 * @returns Formatted password for display
 */
export function formatPasswordForDisplay(password: string): string {
  if (password.length <= 4) {
    return '*'.repeat(password.length);
  }
  return password.substring(0, 2) + '*'.repeat(password.length - 4) + password.substring(password.length - 2);
}

