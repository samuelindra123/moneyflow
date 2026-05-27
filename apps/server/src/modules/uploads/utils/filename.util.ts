import { randomUUID } from 'crypto';
import * as path from 'path';

/**
 * Generate a secure random filename using UUID.
 * Strips the original filename for security.
 */
export function generateSecureFilename(originalname: string): string {
  const ext = path.extname(originalname).toLowerCase();
  return `${randomUUID()}${ext}`;
}
