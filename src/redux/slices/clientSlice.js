import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientServices from '../services/clientServices';

const initialState = {
  client: {
    photos: {
      search: [],
      curated: [],
      detail: [],
    },
    videos: {
      search: [],
      popular: [],
      detail: [],
    },
    collections: {
      featured: [],
      detail: [],
    },
  },

  isLoading: {
    photos: {
      fetchSearchPhotos: false,
      fetchCuratedPhotos: false,
      fetchDetailPhoto: false,
    },
    videos: {
      fetchSearchVideos: false,
      fetchPopularVideos: false,
      fetchDetailVideos: false,
    },
    collection: {
      fetchFeaturedCollections: false,
      fetchCollectionDetail: false,
    },
  },

  isError: {
    photos: {
      fetchSearchPhotos: false,
      fetchCuratedPhotos: false,
      fetchDetailPhoto: false,
    },
    videos: {
      fetchSearchVideos: false,
      fetchPopularVideos: false,
      fetchDetailVideos: false,
    },
    collection: {
      fetchFeaturedCollections: false,
      fetchCollectionDetail: false,
    },
  },

  isSuccess: {
    photos: {
      fetchSearchPhotos: false,
      fetchCuratedPhotos: false,
      fetchDetailPhoto: false,
    },
    videos: {
      fetchSearchVideos: false,
      fetchPopularVideos: false,
      fetchDetailVideos: false,
    },
    collection: {
      fetchFeaturedCollections: false,
      fetchCollectionDetail: false,
    },
  },
  error: null,
};

/* PHOTOS */
export const fetchSearchPhotos = createAsyncThunk(
  'photos/fetch/search',
  async (parameters, thunkAPI) => {
    try {
      const response = await clientServices.fetchPhotos.search(parameters, data => data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchCuratedPhotos = createAsyncThunk(
  'photos/fetch/curated',
  async (parameters, thunkAPI) => {
    try {
      const response = await clientServices.fetchPhotos.curated(parameters, data => data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchPhotoDetail = createAsyncThunk(
  'photos/fetch/photos/detail',
  async (photoId, thunkAPI) => {
    try {
      const response = await clientServices.fetchPhotos.detail(photoId, data => data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

/* VIDEOS */
export const fetchSearchVideos = createAsyncThunk(
  'videos/fetch/search',
  async (parameters, thunkAPI) => {
    try {
      const response = await clientServices.fetchVideos.search(parameters, data => data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchPopularVideos = createAsyncThunk(
  'videos/fetch/popular',
  async (parameters, thunkAPI) => {
    try {
      const response = await clientServices.fetchVideos.popular(parameters, data => data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchVideoDetail = createAsyncThunk(
  'videos/fetch/videos/detail',
  async (videoId, thunkAPI) => {
    try {
      const response = await clientServices.fetchVideos.detail(videoId, data => data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

/* COLLECTIONS */
export const fetchFeaturedCollections = createAsyncThunk(
  'collections/fetch/featured',
  async (parameters, thunkAPI) => {
    try {
      const response = await clientServices.fetchCollection.featured(parameters, data => data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCollectionDetail = createAsyncThunk(
  'collections/fetch/detail',
  async (collectionId, parameters, thunkAPI) => {
    try {
      const response = await clientServices.fetchVideos.detail(
        collectionId,
        parameters,
        data => data
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

/* SLICE */
const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers(builder) {
    /* PHOTOS */
    builder
      .addCase(fetchSearchPhotos.pending, state => {
        state.isLoading.photos.fetchSearchPhotos = true;
        state.isSuccess.photos.fetchSearchPhotos = false;
        state.isError.photos.fetchSearchPhotos = false;
      })
      .addCase(fetchSearchPhotos.fulfilled, (state, action) => {
        state.client.photos.search = action.payload;
        state.isLoading.photos.fetchSearchPhotos = false;
        state.isSuccess.photos.fetchSearchPhotos = true;
        state.isError.photos.fetchSearchPhotos = false;
      })
      .addCase(fetchSearchPhotos.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading.photos.fetchSearchPhotos = false;
        state.isSuccess.photos.fetchSearchPhotos = false;
        state.isError.photos.fetchSearchPhotos = true;
      })
      .addCase(fetchCuratedPhotos.pending, state => {
        state.isLoading.photos.fetchCuratedPhotos = true;
        state.isSuccess.photos.fetchCuratedPhotos = false;
        state.isError.photos.fetchCuratedPhotos = false;
      })
      .addCase(fetchCuratedPhotos.fulfilled, (state, action) => {
        state.client.photos.curated = action.payload;
        state.isLoading.photos.fetchCuratedPhotos = false;
        state.isSuccess.photos.fetchCuratedPhotos = true;
        state.isError.photos.fetchCuratedPhotos = false;
      })
      .addCase(fetchCuratedPhotos.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading.photos.fetchCuratedPhotos = false;
        state.isSuccess.photos.fetchCuratedPhotos = false;
        state.isError.photos.fetchCuratedPhotos = true;
      })
      .addCase(fetchPhotoDetail.pending, state => {
        state.isLoading.photos.fetchDetailPhoto = true;
        state.isSuccess.photos.fetchDetailPhoto = false;
        state.isError.photos.fetchDetailPhoto = false;
      })
      .addCase(fetchPhotoDetail.fulfilled, (state, action) => {
        state.client.photos.detail = action.payload;
        state.isLoading.photos.fetchDetailPhoto = false;
        state.isSuccess.photos.fetchDetailPhoto = true;
        state.isError.photos.fetchDetailPhoto = false;
      })
      .addCase(fetchPhotoDetail.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading.photos.fetchDetailPhoto = false;
        state.isSuccess.photos.fetchDetailPhoto = false;
        state.isError.photos.fetchDetailPhoto = true;
      })
      /* VIDEOS */
      .addCase(fetchSearchVideos.pending, state => {
        state.isLoading.videos.fetchSearchVideos = true;
        state.isSuccess.videos.fetchSearchVideos = false;
        state.isError.videos.fetchSearchVideos = false;
      })
      .addCase(fetchSearchVideos.fulfilled, (state, action) => {
        state.client.videos.search = action.payload;
        state.isLoading.videos.fetchSearchVideos = false;
        state.isSuccess.videos.fetchSearchVideos = true;
        state.isError.videos.fetchSearchVideos = false;
      })
      .addCase(fetchSearchVideos.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading.videos.fetchSearchVideos = false;
        state.isSuccess.videos.fetchSearchVideos = false;
        state.isError.videos.fetchSearchVideos = true;
      })
      .addCase(fetchPopularVideos.pending, state => {
        state.isLoading.videos.fetchPopularVideos = true;
        state.isSuccess.videos.fetchPopularVideos = false;
        state.isError.videos.fetchPopularVideos = false;
      })
      .addCase(fetchPopularVideos.fulfilled, (state, action) => {
        state.client.videos.popular = action.payload;
        state.isLoading.videos.fetchPopularVideos = false;
        state.isSuccess.videos.fetchPopularVideos = true;
        state.isError.videos.fetchPopularVideos = false;
      })
      .addCase(fetchPopularVideos.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading.videos.fetchPopularVideos = false;
        state.isSuccess.videos.fetchPopularVideos = false;
        state.isError.videos.fetchPopularVideos = true;
      })
      .addCase(fetchVideoDetail.pending, state => {
        state.isLoading.videos.fetchVideoDetail = true;
        state.isSuccess.videos.fetchVideoDetail = false;
        state.isError.videos.fetchVideoDetail = false;
      })
      .addCase(fetchVideoDetail.fulfilled, (state, action) => {
        state.client.videos.search = action.payload;
        state.isLoading.videos.fetchVideoDetail = false;
        state.isSuccess.videos.fetchVideoDetail = true;
        state.isError.videos.fetchVideoDetail = false;
      })
      .addCase(fetchVideoDetail.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading.videos.fetchVideoDetail = false;
        state.isSuccess.videos.fetchVideoDetail = false;
        state.isError.videos.fetchVideoDetail = true;
      })
      /* COLLECTIONS */
      .addCase(fetchFeaturedCollections.pending, state => {
        state.isLoading.collection.fetchFeaturedCollections = true;
        state.isSuccess.collection.fetchFeaturedCollections = false;
        state.isError.collection.fetchFeaturedCollections = false;
      })
      .addCase(fetchFeaturedCollections.fulfilled, (state, action) => {
        state.client.collections.featured = action.payload;
        state.isLoading.collection.fetchFeaturedCollections = false;
        state.isSuccess.collection.fetchFeaturedCollections = true;
        state.isError.collection.fetchFeaturedCollections = false;
      })
      .addCase(fetchFeaturedCollections.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading.collection.fetchFeaturedCollections = false;
        state.isSuccess.collection.fetchFeaturedCollections = false;
        state.isError.collection.fetchFeaturedCollections = true;
      })
      .addCase(fetchCollectionDetail.pending, state => {
        state.isLoading.collection.fetchCollectionDetail = true;
        state.isSuccess.collection.fetchCollectionDetail = false;
        state.isError.collection.fetchCollectionDetail = false;
      })
      .addCase(fetchCollectionDetail.fulfilled, (state, action) => {
        state.client.collections.featured = action.payload;
        state.isLoading.collection.fetchCollectionDetail = false;
        state.isSuccess.collection.fetchCollectionDetail = true;
        state.isError.collection.fetchCollectionDetail = false;
      })
      .addCase(fetchCollectionDetail.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading.collection.fetchCollectionDetail = false;
        state.isSuccess.collection.fetchCollectionDetail = false;
        state.isError.collection.fetchCollectionDetail = true;
      });
  },
});

export default clientSlice.reducer;
