import { MicroserviceType } from '../../generated/prisma/enums';

function isMicroserviceType(value: unknown): value is MicroserviceType {
  return (
    typeof value === 'string' &&
    Object.values(MicroserviceType).includes(value as MicroserviceType)
  );
}

function parseDateQuery(raw: unknown): Date | null {
  const dateStr: unknown = Array.isArray(raw) ? raw[0] : raw;
  if (!dateStr || typeof dateStr !== 'string') return null;
  return new Date(dateStr);
}

export { isMicroserviceType, parseDateQuery };
