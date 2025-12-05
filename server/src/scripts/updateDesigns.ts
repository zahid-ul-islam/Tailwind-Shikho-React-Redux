import mongoose from "mongoose";

// Connection URL - update with your MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tailwind-shikho";

async function updateDesigns() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Update all designs that have "Preview Content" or empty content
    // This will clear old default values
    if (!mongoose.connection.db) {
      throw new Error("Database connection not established");
    }

    const result = await mongoose.connection.db
      .collection("designs")
      .updateMany(
        {
          $or: [
            { content: "Preview Content" },
            { content: { $exists: false } },
          ],
        },
        { $set: { content: "" } }
      );

    console.log(`Updated ${result.modifiedCount} designs`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

updateDesigns();
