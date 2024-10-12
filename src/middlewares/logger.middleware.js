import fs from 'fs/promises';  

async function log(logdata) {
  try {
    const timestamp = new Date().toISOString(); // Using ISO format for clarity
    logdata = `${timestamp} - ${logdata}\n`;  // Clear formatting
    await fs.appendFile('log.txt', logdata);
  } catch (err) {
    console.error("Logging error:", err); // More descriptive error message
  }
}

export const loggerMiddleware = async (req, res, next) => {
  // Convert the request body to a log string
  const logdata = `${req.method} ${req.url} - ${JSON.stringify(req.body)}`;
  
  // Log the data
  await log(logdata);
  
  next(); // Ensure to call next to continue to the next middleware
};

export default loggerMiddleware;