import * as ormconfig from './ormconfig';

module.exports = {
  ...ormconfig,
  migrationsTableName: 'migrations',
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  }
};