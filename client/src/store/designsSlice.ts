import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface Design {
  _id: string;
  title: string;
  tailwindClasses: string;
  content: string;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DesignsState {
  items: Design[];
  currentDesign: Design | null;
  loading: boolean;
  error: string | null;
}

const initialState: DesignsState = {
  items: [],
  currentDesign: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchDesigns = createAsyncThunk(
  "designs/fetchDesigns",
  async () => {
    const response = await axios.get("http://localhost:5000/api/designs");
    return response.data;
  }
);

export const saveDesign = createAsyncThunk(
  "designs/saveDesign",
  async (design: {
    title: string;
    tailwindClasses: string;
    content: string;
  }) => {
    const response = await axios.post(
      "http://localhost:5000/api/designs",
      design
    );
    return response.data;
  }
);

export const updateDesign = createAsyncThunk(
  "designs/updateDesign",
  async ({
    id,
    design,
  }: {
    id: string;
    design: { title: string; tailwindClasses: string; content: string };
  }) => {
    const response = await axios.put(
      `http://localhost:5000/api/designs/${id}`,
      design
    );
    return response.data;
  }
);

export const deleteDesign = createAsyncThunk(
  "designs/deleteDesign",
  async (id: string) => {
    await axios.delete(`http://localhost:5000/api/designs/${id}`);
    return id;
  }
);

const designsSlice = createSlice({
  name: "designs",
  initialState,
  reducers: {
    setCurrentDesign(state, action: PayloadAction<Design | null>) {
      state.currentDesign = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesigns.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDesigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch designs";
      })
      .addCase(saveDesign.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateDesign.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentDesign?._id === action.payload._id) {
          state.currentDesign = action.payload;
        }
      })
      .addCase(deleteDesign.fulfilled, (state, action) => {
        state.items = state.items.filter((d) => d._id !== action.payload);
        if (state.currentDesign?._id === action.payload) {
          state.currentDesign = null;
        }
      });
  },
});

export const { setCurrentDesign } = designsSlice.actions;
export default designsSlice.reducer;
