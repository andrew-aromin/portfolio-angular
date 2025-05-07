import xss from 'xss';
import validator from 'validator';

/**
 * Sanitizes a string input and validates whether it's a URL.
 * @param input The string to clean and validate.
 * @returns A sanitized string if it's a valid URL, otherwise null.
 */
export function cleanAndValidate(input: string): string | null {
  const sanitized: string = xss(input);

  const isValid: boolean = validator.isURL(sanitized, {
    require_protocol: false, // allow domain-like inputs without http/https
  });

  return isValid ? sanitized : null;
}

/**
 * Converts a Blob to a base64-encoded data URL string.
 * @param blob The Blob to convert.
 * @returns A Promise that resolves to a base64 string.
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!blob) return reject('No blob provided');
    
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to convert blob to base64.');
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
