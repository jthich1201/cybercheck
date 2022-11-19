import pg from 'pg';
import incidentResponseDb from '../config/dbConfig';

const { Pool, types } = pg;

const incidentResponseDbConfig = incidentResponseDb;
const incidentResponseDbPool = new Pool(incidentResponseDbConfig);

incidentResponseDbPool.on('connect', () => {
  console.info('Connected to database!');
});
incidentResponseDbPool.on('acquire', () => {
  console.info('Client was acquired from the database!');
});
incidentResponseDbPool.on('remove', () => {
  console.info('Client was removed from the pool!');
});
incidentResponseDbPool.on('error', () => {
  console.info('Pool error!');
});

export default incidentResponseDbPool;