import { Request, Response, NextFunction } from "express";

/**
 * Security Event Types
 */
export enum SecurityEventType {
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  CSP_VIOLATION = "CSP_VIOLATION",
  XSS_ATTEMPT = "XSS_ATTEMPT",
  CLICKJACKING_ATTEMPT = "CLICKJACKING_ATTEMPT",
  SUSPICIOUS_REQUEST = "SUSPICIOUS_REQUEST",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
  INVALID_SSL = "INVALID_SSL",
}

/**
 * Security Event Log Entry
 */
export interface SecurityEvent {
  timestamp: Date;
  type: SecurityEventType;
  ip: string;
  userAgent: string;
  url: string;
  method: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  details: Record<string, any>;
}

/**
 * Security Monitoring Service
 * Tracks and logs security-related events
 */
class SecurityMonitoringService {
  private events: SecurityEvent[] = [];
  private maxEvents = 1000; // Keep last 1000 events in memory
  private alertThresholds = {
    rateLimitPerIP: 10, // Alert if 10+ rate limit violations per IP
    timeWindow: 60 * 60 * 1000, // 1 hour
  };

  /**
   * Log a security event
   */
  logEvent(event: Omit<SecurityEvent, "timestamp">): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date(),
    };

    this.events.push(fullEvent);

    // Keep array size manageable
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log to console based on severity
    this.logToConsole(fullEvent);

    // Check for alerts
    this.checkForAlerts(fullEvent);
  }

  /**
   * Log to console with color coding
   */
  private logToConsole(event: SecurityEvent): void {
    const colors = {
      LOW: "\x1b[36m", // Cyan
      MEDIUM: "\x1b[33m", // Yellow
      HIGH: "\x1b[31m", // Red
      CRITICAL: "\x1b[41m", // Red background
    };

    const reset = "\x1b[0m";
    const color = colors[event.severity];

    console.log(
      `${color}[SECURITY] ${event.type} (${event.severity}) - IP: ${event.ip}${reset}`
    );
    if (Object.keys(event.details).length > 0) {
      console.log(`  Details: ${JSON.stringify(event.details)}`);
    }
  }

  /**
   * Check for security alerts
   */
  private checkForAlerts(event: SecurityEvent): void {
    if (event.type === SecurityEventType.RATE_LIMIT_EXCEEDED) {
      this.checkRateLimitAlerts(event.ip);
    }

    if (event.severity === "CRITICAL") {
      this.sendCriticalAlert(event);
    }
  }

  /**
   * Check for rate limit abuse from a single IP
   */
  private checkRateLimitAlerts(ip: string): void {
    const now = Date.now();
    const recentEvents = this.events.filter(
      (e) =>
        e.ip === ip &&
        e.type === SecurityEventType.RATE_LIMIT_EXCEEDED &&
        now - e.timestamp.getTime() < this.alertThresholds.timeWindow
    );

    if (recentEvents.length >= this.alertThresholds.rateLimitPerIP) {
      console.warn(
        `\x1b[41m[ALERT] Possible brute force attack from IP: ${ip} (${recentEvents.length} violations in 1 hour)\x1b[0m`
      );
    }
  }

  /**
   * Send critical alert (in production, this would integrate with alerting service)
   */
  private sendCriticalAlert(event: SecurityEvent): void {
    console.error(
      `\x1b[41m[CRITICAL ALERT] ${event.type} from ${event.ip}\x1b[0m`
    );
    // TODO: Integrate with Slack, PagerDuty, or other alerting service
  }

  /**
   * Get recent events
   */
  getRecentEvents(
    limit: number = 50,
    type?: SecurityEventType
  ): SecurityEvent[] {
    let filtered = [...this.events].reverse();

    if (type) {
      filtered = filtered.filter((e) => e.type === type);
    }

    return filtered.slice(0, limit);
  }

  /**
   * Get events by IP
   */
  getEventsByIP(ip: string, limit: number = 50): SecurityEvent[] {
    return this.events
      .filter((e) => e.ip === ip)
      .reverse()
      .slice(0, limit);
  }

  /**
   * Get statistics
   */
  getStatistics(): Record<string, any> {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const recentEvents = this.events.filter(
      (e) => e.timestamp.getTime() > oneHourAgo
    );

    const eventsByType: Record<string, number> = {};
    const eventsBySeverity: Record<string, number> = {};
    const uniqueIPs = new Set<string>();

    recentEvents.forEach((event) => {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
      eventsBySeverity[event.severity] =
        (eventsBySeverity[event.severity] || 0) + 1;
      uniqueIPs.add(event.ip);
    });

    return {
      totalEvents: this.events.length,
      recentEventsLastHour: recentEvents.length,
      eventsByType,
      eventsBySeverity,
      uniqueIPsLastHour: uniqueIPs.size,
      topThreats: this.getTopThreats(recentEvents),
    };
  }

  /**
   * Get top threats in recent events
   */
  private getTopThreats(events: SecurityEvent[]): Array<{ ip: string; count: number }> {
    const ipCounts: Record<string, number> = {};

    events.forEach((event) => {
      ipCounts[event.ip] = (ipCounts[event.ip] || 0) + 1;
    });

    return Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
}

// Export singleton instance
export const securityMonitoring = new SecurityMonitoringService();

/**
 * Middleware to extract client IP
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress;
  return ip || "unknown";
}

/**
 * Middleware to monitor security headers
 */
export function monitorSecurityHeaders(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const originalSend = res.send;

  res.send = function (data: any) {
    // Check if security headers are present
    const requiredHeaders = [
      "Content-Security-Policy",
      "X-Frame-Options",
      "X-Content-Type-Options",
    ];

    const missingHeaders = requiredHeaders.filter((header) => !res.getHeader(header));

    if (missingHeaders.length > 0) {
      securityMonitoring.logEvent({
        type: SecurityEventType.SUSPICIOUS_REQUEST,
        ip: getClientIP(req),
        userAgent: req.headers["user-agent"] || "unknown",
        url: req.originalUrl,
        method: req.method,
        severity: "MEDIUM",
        details: {
          reason: "Missing security headers",
          missingHeaders,
        },
      });
    }

    return originalSend.call(this, data);
  };

  next();
}
