import { instanceToPlain, plainToInstance, serialize } from 'class-transformer';
import e, { NextFunction, Request, Response, Router } from 'express';
import { ReadNoteDTO, CreateNoteDTO } from './models';
import { client } from './redis';

export const noteRouter = Router();

noteRouter.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    // read in note object
    const note = plainToInstance(CreateNoteDTO, req.body, {
      excludeExtraneousValues: true,
    });

    const storageKey = req.params.id;

    // check if hash is valid
    if (
      !(
        (
          !!storageKey &&
          typeof storageKey === 'string' &&
          storageKey.length === 64 * 2
        ) // working with sha512 here
      )
    ) {
      throw new Error('invalid token');
    }

    await client.set(storageKey, JSON.stringify(instanceToPlain(note)), {
      EX: 24 * 3600,
    });

    res.send();
  }
);

noteRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    // try to fetch key
    const id = req.params.id;
    const note = await client.get(id);

    // if no entry is found
    if (note === null) {
      throw new Error('not found');
    }

    // read in note object
    const publicNote = plainToInstance(ReadNoteDTO, JSON.parse(note), {
      excludeExtraneousValues: true,
    });

    res.send(publicNote);
  }
);
