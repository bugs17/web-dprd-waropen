import { atom } from "jotai";

// atom untuk menyimpan pesan toast
const toastMessageAtom = atom('');
const openDialogPartaiAtom = atom(false);
const openDialogDeletePartaiAtom = atom(false);

export { toastMessageAtom, openDialogPartaiAtom, openDialogDeletePartaiAtom };
