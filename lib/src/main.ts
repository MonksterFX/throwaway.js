import { ThrowAwayClient } from './api';
import { createRandomPassphrase, createStorageKey } from './crypto';
import { createEncryptedNote, decryptNote, Note } from './note';

export async function createThrowAway(
  passphrase: string | undefined,
  msg: string,
  payload: string,
  baseUrl: string,
  notification?: string
): Promise<[string, string | undefined]> {
  // if not passphrase is provided generate one
  const pass = passphrase || createRandomPassphrase();

  // create encrypted message
  const encryptedNote = createEncryptedNote(pass, msg, payload);

  // add notification mail
  encryptedNote.note.notification = notification;

  // send encrpyted note to server
  const client = new ThrowAwayClient(baseUrl);
  await client.createNote(encryptedNote.storageKey, encryptedNote.note);

  // return iv and passphrase (only if automatically generated) for url creation
  return [encryptedNote.iv.toString('hex'), passphrase ? undefined : pass];
}

export async function redeemThrowAway(
  passphrase: string,
  token: string,
  baseUrl?: string
): Promise<Note> {
  // TODO: token should not be IV

  // calculate storage key
  const id = createStorageKey(passphrase, token);

  // fetch encrpyted note from server
  const client = new ThrowAwayClient(baseUrl);
  const encryptedNote = await client.fetchNote(id);

  // decrypt message
  return decryptNote(passphrase, token, encryptedNote);
}
