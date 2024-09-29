import axios from "axios";

export const handleError = (
  err: unknown,
  rejectWithValue: (value: unknown) => unknown
) => {
  if (axios.isAxiosError(err)) {
    return rejectWithValue(err.response?.data.message || "An error occurred");
  } else if (err instanceof Error) {
    return rejectWithValue(err.message);
  } else {
    return rejectWithValue("An unknown error occurred");
  }
};
