import isFined, { getConsideredVelocity } from './isFined';

const MEDIUM_VELOCITY_LIMIT = 1 + 0.2;
const SERIOUS_VELOCITY_LIMIT = 1 + 0.5;

export const FINED_TYPES = {
  medium: '__MEDIUM__',
  serious: '__SERIOUS__',
  verySerious: '__VERY_SERIOUS__',
};

export default function getFinedType({ radarVelocity, limitVelocity }) {
  const parsedLimitVelocity = Number(limitVelocity);

  if (!isFined({ radarVelocity, limitVelocity })) return;

  const consideredVelocity = getConsideredVelocity({ radarVelocity });

  if (consideredVelocity > parsedLimitVelocity * SERIOUS_VELOCITY_LIMIT) {
    return FINED_TYPES.verySerious;
  }

  if (consideredVelocity > parsedLimitVelocity * MEDIUM_VELOCITY_LIMIT) {
    return FINED_TYPES.serious;
  }

  return FINED_TYPES.medium;
}
