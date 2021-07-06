import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { DatabaseModule } from './database/database.module';
import { TeamModule } from './team/team.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { OpenTelemetryModule } from 'nestjs-otel';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { BatchSpanProcessor } from '@opentelemetry/tracing';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { diag, DiagLogLevel } from '@opentelemetry/api';

// @ts-ignore
diag.setLogger(console, DiagLogLevel.ALL);

const nodeEnv = process.env.NODE_ENV;

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true, // Includes Host Metrics
    defaultMetrics: true, // Includes Default Metrics
    apiMetrics: {
      enable: true, // Includes api metrics
      timeBuckets: [],
    },
  },
  nodeSDKConfiguration: {
    metricExporter: new PrometheusExporter({
      port: 8081,
    }),
    spanProcessor: new BatchSpanProcessor(new JaegerExporter()),
    contextManager: new AsyncLocalStorageContextManager(),
    instrumentations: [getNodeAutoInstrumentations()],
  },
});

@Module({
  imports: [
    OpenTelemetryModuleConfig,
    ConfigModule.forRoot({
      envFilePath: nodeEnv === 'test' ? '.env.test' : '.env',
    }),
    DatabaseModule,
    RoomModule,
    HealthModule,
    TeamModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
