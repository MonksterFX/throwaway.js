import { createThrowAway, redeemThrowAway } from '../../lib/src/lib';

interface Note {
  passphrase: string;
  note: string;
  payload: string;
  notification: string;
}

export async function createNote(note: Note) {
  const [token, pass]: [string, string | undefined] = await createThrowAway(
    note.passphrase,
    note.note,
    note.payload,
    import.meta.env.VITE_APP_BACKEND_URL || '',
    note.notification
  );

  const currentFrontenURL = new URL(window.location.href);

  return `${currentFrontenURL.protocol}//${currentFrontenURL.hostname}${
    currentFrontenURL.port ? ':' + currentFrontenURL.port : ''
  }/note/read?token=${token}${pass ? '&p=' + pass : ''}`;
}

export async function redeemNote(passphrase: string, token: string) {
  const result = await redeemThrowAway(
    passphrase,
    token,
    import.meta.env.VITE_APP_BACKEND_URL
  );
  return result;
}
