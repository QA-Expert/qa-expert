import { User } from 'graphql-schema-gen/schema.gen';
import { atom } from 'jotai';

export const userAtom = atom<User | null>(null);
