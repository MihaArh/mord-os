import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './configureStore';

export interface File {
  name: string;
  createdAt: number;
  updatedAt: number;
  content: string;
}
export interface DirectoryState {
  name: string;
  path: string;
  files: File[];
}

const initialState: DirectoryState = {
  name: 'Files',
  path: 'MordOs\\Files',
  files: [
    {
      name: 'README.md',
      createdAt: 0,
      updatedAt: 0,
      content: '# MordOs',
    },
  ],
};

export const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    addFileToDirectory: (state, action: PayloadAction<{ file: File; path: string[] }>) => {
      const { file, path } = action.payload;
    },
  },
});

export const { addFile } = directorySlice.actions;

export const selectRootDirectory = (state: RootState) => state.directory;
export const selectDirectoryName = createSelector(selectRootDirectory, directory => directory.name);
export const selectDirectoryPath = createSelector(selectRootDirectory, directory => directory.path);
export const selectFiles = createSelector([selectRootDirectory], directory => directory.files);

export default directorySlice.reducer;
