import { Request, Response, NextFunction } from "express";

/**
 * HTTPS Redirect Middleware
 * Redirects all HTTP requests to HTTPS in production
 * Skips redirect in development environment
 */
export function httpsRedirect(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Skip in development
  if (process.env.NODE_ENV === "development") {
    return next();
  }

  // Check if request is already HTTPS or if it's coming through a proxy
  const isSecure =
    req.secure ||
    req.headers["x-forwarded-proto"] === "https" ||
    req.headers["x-forwarded-proto"] === "wss";

  if (!isSecure) {
    // Redirect to HTTPS
    const host = req.headers.host || "localhost";
    const url = `https://${host}${req.originalUrl}`;
    return res.redirect(301, url);
  }

  next();
}

/**
 * SSL Certificate Validation
 * Validates that SSL certificate is properly configured
 */
export function validateSSLCertificate(): boolean {
  if (process.env.NODE_ENV === "development") {
    console.log("[SSL] Skipping SSL validation in development mode");
    return true;
  }

  // In production, check if SSL is properly configured
  const hasSSL =
    process.env.SSL_CERT_PATH &&
    process.env.SSL_KEY_PATH &&
    process.env.SSL_CERT_PATH.length > 0 &&
    process.env.SSL_KEY_PATH.length > 0;

  if (!hasSSL) {
    console.warn(
      "[SSL] Warning: SSL certificate not configured. HTTPS redirects may not work properly."
    );
    console.warn("[SSL] Set SSL_CERT_PATH and SSL_KEY_PATH environment variables.");
    return false;
  }

  console.log("[SSL] SSL certificate configuration validated ✓");
  return true;
}
