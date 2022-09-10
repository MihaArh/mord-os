import { createSlice } from '@reduxjs/toolkit';
import { Icons } from 'models/constants';

import type { RootState } from './configureStore';

export interface App {
  name: string;
  icon: string;
  tooltip: string;
  opened: boolean;
}
export interface AppsState {
  apps: App[];
}

const initialState: AppsState = {
  apps: [
    {
      name: 'Notes',
      icon: Icons.NOTES,
      tooltip: 'New Note',
      opened: false,
    },
    {
      name: 'Files',
      icon: Icons.FOLDER,
      tooltip: 'Files',
      opened: false,
    },
    {
      name: 'Browser',
      icon: Icons.BROWSER,
      tooltip: 'Browser',
      opened: false,
    },
    {
      name: 'Camera',
      icon: Icons.CAMERA,
      tooltip: 'Camera',
      opened: false,
    },
    {
      name: 'Gallery',
      icon: Icons.IMAGE,
      tooltip: 'Gallery',
      opened: false,
    },
    {
      name: 'News',
      icon: Icons.NEWS,
      tooltip: 'News',
      opened: false,
    },
  ],
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    openApp: (state, action: { payload: string }) => {
      const foundApp = state.apps.find(app => app.name === action.payload);
      if (foundApp) {
        foundApp.opened = true;
      }
    },
  },
});

export const { openApp } = applicationsSlice.actions;

export const selectState = (state: RootState) => state.apps;

export default applicationsSlice.reducer;
