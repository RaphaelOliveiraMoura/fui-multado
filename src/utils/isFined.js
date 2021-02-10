const MAX_VELOCITY_TOLERANCE_CONSTANT = 100;
const VELOCITY_TOLERANCE = 7;
const PERCENTAGE_TOLERANCE = 1 - 0.07;

export default function isFined({ radarVelocity, limitVelocity }) {
  const parsedRadarVelocity = Number(radarVelocity);
  const parsedLimitVelocity = Number(limitVelocity);

  const consideredVelocity =
    parsedRadarVelocity > MAX_VELOCITY_TOLERANCE_CONSTANT
      ? parsedRadarVelocity * PERCENTAGE_TOLERANCE
      : parsedRadarVelocity - VELOCITY_TOLERANCE;

  const consideredVelocityRounded = Math.round(consideredVelocity);

  console.log(consideredVelocityRounded);

  return consideredVelocityRounded > parsedLimitVelocity;
}
