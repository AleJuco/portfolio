// Shared by the browser (which shrinks photos before sending) and the server (which checks them).
export const MAX_PHOTO_BYTES = 900_000; // keeps uploads under the 1MB Server Action body limit
export const PHOTO_SIZE = 800; // photos are cropped square and scaled down to this many pixels across
