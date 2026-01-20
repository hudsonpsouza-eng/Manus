import { Request, Response, NextFunction } from "express";

/**
 * Security Headers Middleware
 * Implements various security headers to protect against common web vulnerabilities
 */
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Content Security Policy (CSP)
  // Prevents XSS attacks by restricting where content can be loaded from
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
      "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https: wss:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );

  // X-Frame-Options
  // Prevents clickjacking attacks by controlling if the site can be framed
  res.setHeader("X-Frame-Options", "DENY");

  // X-Content-Type-Options
  // Prevents MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // X-XSS-Protection
  // Legacy XSS protection (modern browsers use CSP instead)
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Strict-Transport-Security (HSTS)
  // Forces HTTPS connections
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  // Referrer-Policy
  // Controls how much referrer information is shared
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions-Policy (formerly Feature-Policy)
  // Controls which browser features can be used
  res.setHeader(
    "Permissions-Policy",
    [
      "accelerometer=()",
      "ambient-light-sensor=()",
      "autoplay=()",
      "battery=()",
      "camera=()",
      "display-capture=()",
      "document-domain=()",
      "encrypted-media=()",
      "execution-while-not-rendered=()",
      "execution-while-out-of-viewport=()",
      "fullscreen=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "navigation-override=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "sync-xhr=()",
      "usb=()",
      "vr=()",
      "xr-spatial-tracking=()",
    ].join(", ")
  );

  // Disable X-Powered-By header to avoid revealing server technology
  res.removeHeader("X-Powered-By");

  // Set secure cache headers
  res.setHeader("Cache-Control", "public, max-age=3600");

  next();
}
