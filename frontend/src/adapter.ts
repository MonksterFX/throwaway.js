import { createThrowAway, redeemThrowAway } from '../../lib/src/lib';

interface Note {
  passphrase: string;
  note: string;
  payload: string;
  notification: string;
}

const backendURL = 'http://localhost:5000/api/v1';
const frontenURL = 'http://localhost:3000';

export async function createNote(note: Note) {
  const [token, pass]: [string, string | undefined] = await createThrowAway(
    note.passphrase,
    note.note,
    note.payload,
    backendURL,
    note.notification
  );

  return `${frontenURL}/note/read?token=${token}${pass ? '&p=' + pass : ''}`;
}

export async function redeemNote(passphrase: string, token: string) {
  const result = await redeemThrowAway(passphrase, token);

  console.debug(result);

  return result;
}
