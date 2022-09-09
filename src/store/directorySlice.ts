import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './configureStore';

interface File {
  name: string;
  createdAt: number;
  updatedAt: number;
}
// Define a type for the slice state
interface DirectoryState {
  folderName: string;
  created: number;
  lastChange: number;
  subFolders: DirectoryState[] | null;
  files: File[] | null;
}

// Define the initial state using that type
const initialState: DirectoryState = {
  folderName: 'MordOs',
  created: 0,
  lastChange: 0,
  subFolders: [
    {
      folderName: 'Files',
      created: 0,
      lastChange: 0,
      subFolders: null,
      files: [],
    },
  ],
  files: [],
};

export const directorySlice = createSlice({
  name: 'directory',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<File>) => {
      state.files?.push(action.payload);
    },
  },
});

export const { addFile } = directorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectState = (state: RootState) => state;

export default directorySlice.reducer;
