import {
  createIV,
  createStorageKey,
  decrypt,
  encrypt,
  toHexString,
} from './crypto';

export type Note = {
  msg: string;
  payload: string;
  /** which email address to notify on delete */
  notification?: string;
  created?: Date;
};

export async function createEncryptedNote(
  passphrase: string,
  msg: string,
  payload: string
): Promise<{ note: Note; storageKey: string; iv: string }> {
  const iv = createIV();

  const encryptedMessage = await encrypt(passphrase, msg, { iv });

  const note = {
    msg: encryptedMessage.payload,
    payload: '',
  };

  const storageKey = await createStorageKey(passphrase, toHexString(iv));

  return { note: note, storageKey: storageKey, iv: toHexString(iv) };
}

export async function decryptNote(
  passphrase: string,
  iv: string,
  ecryptedNote: Note
): Promise<Note> {
  const note = {
    msg: await decrypt(passphrase, { iv, payload: ecryptedNote.msg }),
    payload: '',
  };

  return note;
}
