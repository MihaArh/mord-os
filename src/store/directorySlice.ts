import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './configureStore';

export interface File {
  name: string;
  createdAt: number;
  updatedAt: number;
  content: string;
  kind: 'file';
}
export interface DirectoryState {
  folderName: string;
  createdAt: number;
  updatedAt: number;
  subFolders: DirectoryState[];
  files?: File[];
  kind: 'folder';
}

const initialState: DirectoryState = {
  folderName: 'MordOs',
  createdAt: 0,
  updatedAt: 0,
  kind: 'folder',
  subFolders: [
    {
      folderName: 'Files',
      createdAt: 0,
      updatedAt: 0,
      subFolders: [],
      kind: 'folder',
      files: [
        {
          name: 'README.md',
          createdAt: 0,
          updatedAt: 0,
          content: '# MordOs',
          kind: 'file',
        },
      ],
    },
  ],
};

export const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<File>) => {
      state.files?.push(action.payload);
    },
  },
});

export const { addFile } = directorySlice.actions;

export const selectState = (state: RootState) => state;

export default directorySlice.reducer;
