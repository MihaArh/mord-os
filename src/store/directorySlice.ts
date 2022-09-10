import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './configureStore';

export interface File {
  id: number;
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
      id: 1,
      name: 'New File',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      content: '# MordOs',
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
      const file = {
        ...action.payload,
        id: state.files[state.files.length - 1].id + 1,
      };
      state.files.push(file);
    },
    updateFile: (state, action: PayloadAction<Partial<File>>) => {
      const foundFile = state.files.find(file => file.name === action.payload.name);
      if (foundFile) {
        foundFile.content = action.payload.content || foundFile.content;
        foundFile.name = action.payload.name || foundFile.name;
        // foundFile.opened = action.payload.opened || foundFile.opened;
        foundFile.updatedAt = new Date().getTime();
      }
    },
  },
});

export const { addFile, deleteFile, updateFile } = directorySlice.actions;

export const selectRootDirectory = (state: RootState) => state.directory;
export const selectDirectoryName = createSelector(selectRootDirectory, directory => directory.name);
export const selectDirectoryPath = createSelector(selectRootDirectory, directory => directory.path);
export const selectFiles = createSelector([selectRootDirectory], directory => directory.files);
export const selectFilesByName = createSelector(
  [selectFiles],
  directory => (name: string) => directory.filter(file => file.name === name),
);
export const selectFileById = createSelector(
  [selectFiles],
  directory => (id: number) => directory.find(file => file.id === id),
);
export const selectAvailableName = createSelector([selectFilesByName], files => (name: string) => {
  let count = 0;
  let found = false;
  let availableName = name;
  while (!found) {
    const sameNames = files(availableName);
    if (sameNames.length === 0) {
      found = true;
      return availableName;
    }
    count += 1;
    availableName = `${name} (${count})`;
  }
  return availableName;
});

export default directorySlice.reducer;
