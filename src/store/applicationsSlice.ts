import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppNames, Icons } from 'models/constants';

import type { RootState } from './configureStore';

export interface App {
  name: string;
  icon: string;
  tooltip: string;
  opened: boolean;
  lastInteracted: number;
  fileId?: number | null;
}
export interface AppsState {
  apps: App[];
}

const initialState: AppsState = {
  apps: [
    {
      name: AppNames.NOTES,
      icon: Icons.NOTES,
      tooltip: 'New Note',
      opened: false,
      lastInteracted: 0,
    },
    {
      name: AppNames.FILES,
      icon: Icons.FOLDER,
      tooltip: 'Files',
      opened: false,
      lastInteracted: 0,
      fileId: null,
    },
    {
      name: AppNames.BROWSER,
      icon: Icons.BROWSER,
      tooltip: 'Browser',
      opened: false,
      lastInteracted: 0,
    },
    {
      name: AppNames.CAMERA,
      icon: Icons.CAMERA,
      tooltip: 'Camera',
      opened: false,
      lastInteracted: 0,
    },
    {
      name: AppNames.GALLERY,
      icon: Icons.IMAGE,
      tooltip: 'Gallery',
      opened: false,
      lastInteracted: 0,
    },
    {
      name: AppNames.NEWS,
      icon: Icons.NEWS,
      tooltip: 'News',
      opened: false,
      lastInteracted: 0,
    },
  ],
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    openApplication: (state, action: PayloadAction<{ name: string; id: number | null }>) => {
      const { name, id } = action.payload;

      const foundApp = state.apps.find(app => app.name === name);
      if (foundApp) {
        foundApp.opened = true;
        foundApp.lastInteracted = new Date().getTime();
        if (id !== null) {
          foundApp.fileId = id;
        }
      }
    },
    interactedWithApplication: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      const foundApp = state.apps.find(app => app.name === name);
      if (foundApp) {
        foundApp.lastInteracted = new Date().getTime();
      }
    },
    closeApplication: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      const foundApp = state.apps.find(app => app.name === name);
      if (foundApp) {
        foundApp.opened = false;
        foundApp.fileId = null;
      }
    },
  },
});

export const { openApplication, interactedWithApplication, closeApplication } = applicationsSlice.actions;

export const selectState = (state: RootState) => state.apps;
export const selectApps = (state: RootState) => state.apps.apps;
export const selectOpenedApps = createSelector([selectApps], apps =>
  apps.filter(app => app.opened).sort((app1, app2) => (app1.lastInteracted < app2.lastInteracted ? -1 : 1)),
);

export default applicationsSlice.reducer;
