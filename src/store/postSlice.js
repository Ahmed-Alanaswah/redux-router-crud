import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null, record: null };

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
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
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

      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    item.userId = auth.id;
    try {
      const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });

      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecored: (state) => {
      state.record = null;
    },
  },
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

    //fetch post
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.record = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(
        fetchPost.rejected,

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

        state.records.push(action.payload);
      })
      .addCase(
        addPosts.rejected,

        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    //update posts
    builder
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;

        state.record = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { cleanRecored } = postSlice.actions;

export default postSlice.reducer;
