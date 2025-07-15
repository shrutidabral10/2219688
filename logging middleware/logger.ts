import axios from 'axios';

type Stack = 'backend' | 'frontend';
type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type BackendPackage =
  | 'cache'
  | 'controller'
  | 'cron_job'
  | 'db'
  | 'domain'
  | 'handler'
  | 'repository'
  | 'route'
  | 'service';
type FrontendPackage = 'api';
type LogPackage = BackendPackage | FrontendPackage;

interface LogPayload {
  stack: Stack;
  level: LogLevel;
  package: LogPackage;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
}

const API_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';

export async function Log(
  stack: Stack,
  level: LogLevel,
  pkg: LogPackage,
  message: string,
  context: Record<string, any> = {}
): Promise<void> {
  const logData: LogPayload = {
    stack,
    level,
    package: pkg,
    message,
    timestamp: new Date().toISOString(),
    context: {
      ...context,
      environment: process.env.NODE_ENV || 'development',
    },
  };

  try {
    const res = await axios.post(API_ENDPOINT, logData, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_TOKEN_HERE' // If needed
      },
    });

    console.log(`[${level.toUpperCase()}] ${stack}/${pkg}: ${message}`, logData.context);
  } catch (err: any) {
    console.error('❌ Failed to send log:', err.message);
  }
}

