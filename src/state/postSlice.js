import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null };

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePosts = createAsyncThunk(
  "posts/deletePosts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPosts = createAsyncThunk(
  "posts/addPosts",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    item.userId = auth.id;
    try {
      const res = await fetch(`http://localhost:5000/posts`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      console.log("===data==", data);
      const data = await res.json();

      console.log("===data==", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(
        fetchPosts.rejected,

        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    //delete posts
    builder
      .addCase(deletePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter((el) => el.id !== action.payload);
      })
      .addCase(
        deletePosts.rejected,

        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    //add posts
    builder
      .addCase(addPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.loading = false;

        console.log("********", action.payload);
        state.records.push(action.payload);
      })
      .addCase(
        addPosts.rejected,

        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default postSlice.reducer;
