const MAX_VELOCITY_TOLERANCE_CONSTANT = 100;
const VELOCITY_TOLERANCE = 7;
const PERCENTAGE_TOLERANCE = 1 - 0.07;

export function getConsideredVelocity({ radarVelocity }) {
  const parsedRadarVelocity = Number(radarVelocity);

  const consideredVelocity =
    parsedRadarVelocity > MAX_VELOCITY_TOLERANCE_CONSTANT
      ? parsedRadarVelocity * PERCENTAGE_TOLERANCE
      : parsedRadarVelocity - VELOCITY_TOLERANCE;

  const consideredVelocityRounded = Math.round(consideredVelocity);

  return consideredVelocityRounded >= 0 ? consideredVelocityRounded : 0;
}

export default function isFined({ radarVelocity, limitVelocity }) {
  const parsedLimitVelocity = Number(limitVelocity);

  const consideredVelocity = getConsideredVelocity({ radarVelocity });

  return consideredVelocity > parsedLimitVelocity;
}
