import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './configureStore';

export interface File {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  content: string;
  selected: boolean;
  oppened: boolean;
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
      id: 0,
      name: 'README.md',
      createdAt: 0,
      updatedAt: 0,
      content: '# MordOs',
      selected: false,
      oppened: false,
    },
  ],
};

export const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    deleteFile: (state, action: PayloadAction<number>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    addFileToDirectory: (state, action: PayloadAction<{ file: File; path: string[] }>) => {
      const { file, path } = action.payload;
    },
    selectItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const selectedFile = state.files.find(file => file.id === id);
      if (selectedFile) {
        selectedFile.selected = !selectedFile.selected;
      }
    },
  },
});

export const { addFile, deleteFile } = directorySlice.actions;

export const selectRootDirectory = (state: RootState) => state.directory;
export const selectDirectoryName = createSelector(selectRootDirectory, directory => directory.name);
export const selectDirectoryPath = createSelector(selectRootDirectory, directory => directory.path);
export const selectFiles = createSelector([selectRootDirectory], directory => directory.files);

export default directorySlice.reducer;
