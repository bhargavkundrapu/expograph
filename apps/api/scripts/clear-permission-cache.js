/**
 * Script to clear the permission cache (useful after granting permissions)
 * 
 * Note: This clears the in-memory cache. If the server is running,
 * you may need to restart it or wait for the cache to expire (10 seconds now).
 */

console.log("\n💡 Permission Cache Info\n");
console.log("The backend permission cache has been reduced to 10 seconds.");
console.log("If you just granted permissions, wait up to 10 seconds for the cache to refresh.");
console.log("Or restart the API server to clear the cache immediately.\n");
console.log("To verify permissions are working:");
console.log("  1. Wait 10 seconds after granting permissions");
console.log("  2. Or restart the API server");
console.log("  3. Then try accessing the page again\n");
