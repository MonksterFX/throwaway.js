interface EncryptionData {
  iv: string;
  payload: string;
}

const encryptionOptions = {
  cipher: 'AES-GCM', // recommended by: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-cbc
  salt: 'throwAway',
  iterations: 10,
  digest: 'SHA-512',
};

/**
 * convert ArrayBuffer into hex string
 * @param buffer
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
 */
export function toHexString(buffer: ArrayBuffer) {
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function fromHexString(data: string): ArrayBuffer {
  const result = [];
  for (var i = 0; i < data.length; i += 2) {
    result.push(parseInt(data.slice(i, i + 2), 16));
  }
  return new Uint8Array(result);
}

/**
 * creates key with 32 bytes length
 * @param passphrase passphrase or passwort
 * @returns key as buffer
 */
async function createKey(passphrase: string): Promise<CryptoKey> {
  let enc = new TextEncoder();
  // generate key from password (32 bytes length)
  return window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
}

/**
 *
 * @param length
 * @returns
 */

async function deriveKey(key: CryptoKey): Promise<CryptoKey> {
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new TextEncoder().encode(encryptionOptions.salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    { name: encryptionOptions.cipher, length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
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
  const randomValues = new Uint8Array(length);
  self.crypto.getRandomValues(randomValues);

  for (let v of randomValues) {
    passphrase.push(lookup[v % lookup.length]);
  }

  return passphrase.join('');
}

/**
 * return random buffer with length of 16 bytes
 * @returns
 */
export function createIV(): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(16));
}

/**
 * generate storage key
 * @returns
 */
export async function createStorageKey(
  passphrase: string,
  iv: string
): Promise<string> {
  const result = await crypto.subtle.digest(
    'SHA-512',
    new TextEncoder().encode(passphrase + iv)
  );
  return toHexString(result);
}

/**
 * encryptes payload with key derived from passphrase
 */
export async function encrypt(
  passphrase: string,
  plaintext: string,
  options?: { iv: Uint8Array }
): Promise<EncryptionData> {
  // create an iv
  const iv = options?.iv || createIV();

  // generate key from password (32 bytes length)
  const key = await createKey(passphrase);
  const masterKey = await deriveKey(key);

  // encrypt
  const result: ArrayBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    masterKey,
    new TextEncoder().encode(plaintext)
  );

  // return values
  return { iv: toHexString(iv), payload: toHexString(result) };
}

/**
 *  encryptes payload with key derived from passphrase
 */
export async function decrypt(
  passphrase: string,
  data: EncryptionData
): Promise<string> {
  // load iv
  const iv = fromHexString(data.iv);

  // load encrypted text
  const encryptedText = fromHexString(data.payload);

  // generate key from password (32 bytes length)
  const key = await createKey(passphrase);
  const masterKey = await deriveKey(key);

  // init decrypt
  const result: ArrayBuffer = await window.crypto.subtle.decrypt(
    {
      name: encryptionOptions.cipher,
      iv: iv,
    },
    masterKey,
    encryptedText
  );

  return new TextDecoder().decode(result);
}
