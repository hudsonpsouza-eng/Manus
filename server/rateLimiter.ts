import rateLimit from "express-rate-limit";

/**
 * Rate Limiter for Contact Form Submissions
 * Prevents brute force attacks and spam submissions
 */
export const contactFormLimiter = rateLimit({
  // Window: 15 minutes
  windowMs: 15 * 60 * 1000,
  
  // Limit: 5 requests per IP per window
  max: 5,
  
  // Message shown when limit exceeded
  message: "Muitas solicitações de orçamento foram enviadas. Por favor, tente novamente em 15 minutos.",
  
  // HTTP status code returned when rate limit exceeded
  statusCode: 429,
  
  // Skip successful requests (only count failures)
  skip: (req) => {
    // Don't rate limit GET requests
    return req.method === "GET";
  },
  
  // Custom key generator (use IP address)
  keyGenerator: (req) => {
    // Get real IP even behind proxy
    const forwarded = req.headers["x-forwarded-for"];
    const ip = typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress;
    return ip || "unknown";
  },
  
  // Store in memory (for production, consider using Redis)
  store: undefined,
  
  // Don't send rate limit headers
  standardHeaders: true,
  
  // Return rate limit info in the response
  legacyHeaders: true,
  
  // Custom handler for when limit is exceeded
  handler: (req: any, res) => {
    res.status(429).json({
      error: "Muitas solicitações. Por favor, tente novamente mais tarde.",
      retryAfter: req.rateLimit?.resetTime,
    });
  },
});

/**
 * Strict Rate Limiter for API endpoints
 * More restrictive than contact form limiter
 */
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: "Muitas requisições. Por favor, tente novamente mais tarde.",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    const ip = typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress;
    return ip || "unknown";
  },
});

/**
 * Authentication Rate Limiter
 * Very strict for login attempts
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP
  message: "Muitas tentativas de login. Por favor, tente novamente em 15 minutos.",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    const ip = typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress;
    return ip || "unknown";
  },
});
