import { createIV, createStorageKey, decrypt, encrypt } from './crypto';

export type Note = {
  msg: string;
  payload: string;
  /** which email address to notify on delete */
  notification?: string;
  created?: Date;
};

export function createEncryptedNote(
  passphrase: string,
  msg: string,
  payload: string
): { note: Note; storageKey: string; iv: Buffer } {
  const iv = createIV();

  const note = {
    msg: encrypt(passphrase, msg, { iv }).payload,
    payload: encrypt(passphrase, payload, { iv }).payload,
  };

  const storageKey = createStorageKey(passphrase, iv.toString('hex'));

  return { note: note, storageKey: storageKey, iv };
}

export function decryptNote(
  passphrase: string,
  iv: string,
  ecryptedNote: Note
): Note {
  const note = {
    msg: decrypt(passphrase, { iv, payload: ecryptedNote.msg }),
    payload: decrypt(passphrase, { iv, payload: ecryptedNote.payload }),
  };

  return note;
}
