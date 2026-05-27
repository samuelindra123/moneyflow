import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

function startsWith(buffer: Buffer, signature: number[], offset = 0): boolean {
  if (buffer.length < signature.length + offset) return false;
  for (let i = 0; i < signature.length; i += 1) {
    if (buffer[i + offset] !== signature[i]) return false;
  }
  return true;
}

function isJpeg(buffer: Buffer): boolean {
  // JPEG starts with FF D8 FF
  return startsWith(buffer, [0xff, 0xd8, 0xff]);
}

function isPng(buffer: Buffer): boolean {
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  return startsWith(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
}

function isGif(buffer: Buffer): boolean {
  // GIF87a or GIF89a
  return (
    startsWith(buffer, [0x47, 0x49, 0x46, 0x38, 0x37, 0x61]) ||
    startsWith(buffer, [0x47, 0x49, 0x46, 0x38, 0x39, 0x61])
  );
}

function isWebp(buffer: Buffer): boolean {
  // WEBP is RIFF container with "WEBP" at offset 8
  return (
    startsWith(buffer, [0x52, 0x49, 0x46, 0x46]) &&
    startsWith(buffer, [0x57, 0x45, 0x42, 0x50], 8)
  );
}

export function detectImageMime(buffer: Buffer): (typeof ALLOWED_MIME_TYPES)[number] | null {
  if (isJpeg(buffer)) return 'image/jpeg';
  if (isPng(buffer)) return 'image/png';
  if (isWebp(buffer)) return 'image/webp';
  if (isGif(buffer)) return 'image/gif';
  return null;
}

const DANGEROUS_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.sh', '.php', '.jsp',
  '.asp', '.cgi', '.py', '.pl', '.rb', '.js',
  '.html', '.htm', '.svg', '.xml',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function imageFileFilter(
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void {
  // Check mime type
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return callback(
      new BadRequestException(
        `Invalid file type: ${file.mimetype}. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
      ),
      false,
    );
  }

  // Check for dangerous extensions
  const ext = file.originalname.toLowerCase().split('.').pop() || '';
  if (DANGEROUS_EXTENSIONS.includes(`.${ext}`)) {
    return callback(
      new BadRequestException('File extension not allowed'),
      false,
    );
  }

  callback(null, true);
}

export function validateMagicBytes(buffer: Buffer, mimetype: string): boolean {
  const detected = detectImageMime(buffer);
  return detected !== null && detected === mimetype;
}

export { MAX_FILE_SIZE, ALLOWED_MIME_TYPES };
