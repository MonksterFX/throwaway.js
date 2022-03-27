import { Expose, Type } from 'class-transformer';

export type Note = {
  msg?: string;
  payload?: string;
  /** which email address to notify on delete */
  notification?: string;
  created: Date;
  /** challenge */
  hash: string;
};

export type PublicNote = Omit<Note, 'hash' | 'notification'>;

export class CreateNoteDTO implements Note {
  constructor() {
    this.created = new Date();
  }

  @Expose()
  msg?: string;

  @Expose()
  payload?: string;

  @Type(() => Date)
  created!: Date;

  @Expose()
  notification?: string;

  @Expose()
  hash!: string;
}

export class ReadNoteDTO implements Note {
  @Expose()
  msg?: string;

  @Expose()
  payload?: string;

  @Expose()
  @Type(() => Date)
  created!: Date;

  notification?: string;

  hash!: string;
}
