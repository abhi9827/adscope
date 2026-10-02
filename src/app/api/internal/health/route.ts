import { NextResponse } from "next/server";

export interface SourceHealthStatus {
  sourceName: string;
  status: 'active' | 'synced' | 'not_connected' | 'error';
  lastRun: string;
  recordsProcessed: number;
  newRecords: number;
  updatedRecords: number;
  duplicates: number;
  invalidRecords: number;
  demoRecords: number;
  error?: string;
}

export interface IngestionHealthResponse {
  systemStatus: 'healthy' | 'degraded';
  timestamp: string;
  sources: SourceHealthStatus[];
}

export async function GET() {
  const healthData: IngestionHealthResponse = {
    systemStatus: 'healthy',
    timestamp: new Date().toISOString(),
    sources: [
      {
        sourceName: 'TikTok Creative Center',
        status: 'active',
        lastRun: '2 hours ago',
        recordsProcessed: 1248,
        newRecords: 32,
        updatedRecords: 14,
        duplicates: 7,
        invalidRecords: 2,
        demoRecords: 24
      },
      {
        sourceName: 'Meta Ad Library',
        status: 'synced',
        lastRun: '4 hours ago',
        recordsProcessed: 2890,
        newRecords: 54,
        updatedRecords: 21,
        duplicates: 18,
        invalidRecords: 0,
        demoRecords: 48
      },
      {
        sourceName: 'Google Ads Transparency Center',
        status: 'not_connected',
        lastRun: 'Never',
        recordsProcessed: 0,
        newRecords: 0,
        updatedRecords: 0,
        duplicates: 0,
        invalidRecords: 0,
        demoRecords: 12
      },
      {
        sourceName: 'AdScope Demo Seed Dataset',
        status: 'active',
        lastRun: 'Instant',
        recordsProcessed: 84,
        newRecords: 0,
        updatedRecords: 0,
        duplicates: 0,
        invalidRecords: 0,
        demoRecords: 84
      }
    ]
  };

  return NextResponse.json(healthData);
}
