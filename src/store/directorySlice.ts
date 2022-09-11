import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortableFields } from 'models/enums';

import type { RootState } from './configureStore';

export interface File {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  content: string;
}

export interface SortableField {
  name: string;
  selected: boolean;
  sortDesc: boolean;
}
export interface DirectoryState {
  name: string;
  path: string;
  sortableFields: SortableField[];
  files: File[];
}

const initialState: DirectoryState = {
  name: 'Files',
  path: 'MordOs\\Files',
  sortableFields: [
    { name: SortableFields.NAME, selected: true, sortDesc: true },
    { name: SortableFields.LAST_MODIFIED, selected: false, sortDesc: true },
    { name: SortableFields.CREATED, selected: false, sortDesc: true },
  ],
  files: [
    {
      id: 1,
      name: 'Adobe',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      content: '# MordOs',
    },
    {
      id: 2,
      name: 'BlackBerry',
      createdAt: new Date().getTime() - 1000 * 60 * 60,
      updatedAt: new Date().getTime() - 1000 * 60 * 60,
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
      state.files.push(action.payload);
    },
    updateFile: (state, action: PayloadAction<Partial<File>>) => {
      const foundFile = state.files.find(file => file.id === action.payload.id);
      if (foundFile) {
        foundFile.content = action.payload.content || foundFile.content;
        foundFile.name = action.payload.name || foundFile.name;
        foundFile.updatedAt = new Date().getTime();
      }
    },
    updateSortBy: (state, action: PayloadAction<{ name: string; sortDesc: boolean }>) => {
      const { name, sortDesc } = action.payload;
      state.sortableFields.forEach(field => {
        if (field.name === name) {
          field.selected = true;
          field.sortDesc = !sortDesc;
        } else {
          field.selected = false;
        }
      });
    },
  },
});

export const { addFile, deleteFile, updateFile, updateSortBy } = directorySlice.actions;

export const selectRootDirectory = (state: RootState) => state.directory;
export const selectDirectoryName = createSelector(selectRootDirectory, directory => directory.name);
export const selectDirectoryPath = createSelector(selectRootDirectory, directory => directory.path);
export const selectSortableFields = createSelector(selectRootDirectory, directory => directory.sortableFields);
export const selectFiles = createSelector([selectRootDirectory], directory => directory.files);
export const selectSortedFiles = createSelector([selectFiles, selectSortableFields], (files, sortableFields) => {
  const { name, sortDesc } = sortableFields.find(field => field.selected) || {
    field: SortableFields.NAME,
    sortDesc: true,
  };

  return files.slice().sort((file1: File, file2: File) => {
    if (name === SortableFields.NAME) {
      return sortDesc ? file1.name.localeCompare(file2.name) : file2.name.localeCompare(file1.name);
    }
    if (name === SortableFields.LAST_MODIFIED) {
      return sortDesc ? file1.updatedAt - file2.updatedAt : file2.updatedAt - file1.updatedAt;
    }
    if (name === SortableFields.CREATED) {
      return sortDesc ? file1.createdAt - file2.createdAt : file2.createdAt - file1.createdAt;
    }
    return 0;
  });
});
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

export const selectAvailableId = createSelector([selectFiles], files => {
  const lastFile = files[files.length - 1];
  if (!lastFile) return 1 + Date.now();
  return lastFile.id + 1 + Date.now();
});

export default directorySlice.reducer;
