const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_ENDPOINT,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  projectName : import.meta.env.VITE_APPWRITE_PROJECT_NAME
};

export default conf;
