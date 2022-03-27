const Crypto = require('crypto-browserify');

interface EncryptionData {
  iv: string;
  payload: string;
}

const encryptionOptions = {
  cipher: 'aes-256-cbc',
  salt: 'throwAway',
  iterations: 10,
  digest: 'sha512',
};

/**
 * creates key with 32 bytes length
 * @param passphrase passphrase or passwort
 * @returns key as buffer
 */
function createKey(passphrase: string): Buffer {
  // generate key from password (32 bytes length)
  const key = Crypto.pbkdf2Sync(
    passphrase,
    encryptionOptions.salt,
    10,
    32,
    encryptionOptions.digest
  );

  // return as buffer
  return Buffer.from(key);
}

/**
 * generates a random password
 * @param length
 * @returns
 */
export function createRandomPassphrase(length = 16): string {
  // 64 characters should garantee a even distribution
  const lookup =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';

  const passphrase = [];

  for (let v of Crypto.randomBytes(10)) {
    passphrase.push(lookup[v % lookup.length]);
  }

  return passphrase.join('');
}

/**
 * return random buffer with length of 16 bytes
 * @returns
 */
export function createIV(): Buffer {
  return Crypto.randomBytes(16);
}

/**
 * generate storage key
 * @returns
 */
export function createStorageKey(passphrase: string, iv: string): string {
  const hashFunction = Crypto.createHash('sha512');
  return hashFunction.update(iv).update(passphrase).digest('hex');
}

/**
 * encryptes payload with key derived from passphrase
 */
export function encrypt(
  passphrase: string,
  payload: string,
  options?: { iv: Buffer }
): EncryptionData {
  // create an iv
  const iv = options?.iv || createIV();

  // generate key from password (32 bytes length)
  const key = createKey(passphrase);

  // init decipher
  const cipher = Crypto.createCipheriv(encryptionOptions.cipher, key, iv);

  // encrypt and finalize
  let encrypted = cipher.update(payload);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // return values
  return { iv: iv.toString('hex'), payload: encrypted.toString('hex') };
}

/**
 *  encryptes payload with key derived from passphrase
 */
export function decrypt(passphrase: string, data: EncryptionData): string {
  // load iv
  const iv = Buffer.from(data.iv, 'hex');

  // load encrypted text
  const encryptedText = Buffer.from(data.payload, 'hex');

  // generate key from password (32 bytes length)
  const key = createKey(passphrase);

  // init decipher
  const decipher = Crypto.createDecipheriv(encryptionOptions.cipher, key, iv);

  // decrpyt and finalize
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
