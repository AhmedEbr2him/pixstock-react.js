import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isDrawerOpen: JSON.parse(sessionStorage.getItem('drawerState')) || false,
  isSearchViewOpen: JSON.parse(sessionStorage.getItem('searchViewState')) || false,
  searchInputValue: '',
  segmentValue: 'photos',
  isDetailPage: false,
  videoDownloadData: [],
  photoDownloadData: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.isDrawerOpen = !state.isDrawerOpen;
      sessionStorage.setItem('drawerState', JSON.stringify(state.isDrawerOpen));
    },
    toggleSearchView: state => {
      state.isSearchViewOpen = !state.isSearchViewOpen;
      sessionStorage.setItem('searchViewState', JSON.stringify(state.isSearchViewOpen));
    },
    getSearchValueInput: (state, action) => {
      state.searchInputValue = action.payload;
    },
    getSegmentValue: (state, action) => {
      state.segmentValue = action.payload;
    },
    handleIsDetailPage: (state, action) => {
      state.isDetailPage = action.payload;
    },
    handlePhotoDownloadData: (state, action) => {
      state.photoDownloadData = action.payload;
    },
    handleVideoDownloadData: (state, action) => {
      state.videoDownloadData = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const {
  toggleSearchView,
  toggleDrawer,
  getSearchValueInput,
  getSegmentValue,
  handleIsDetailPage,
  handlePhotoDownloadData,
  handleVideoDownloadData,
} = mainSlice.actions;
