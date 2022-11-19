import { atom } from 'jotai';
import { User } from './__generated__/graphql';

export const userAtom = atom<User | null>(null);
