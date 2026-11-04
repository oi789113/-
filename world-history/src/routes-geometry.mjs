/**
 * Split a longitude/latitude polyline at the antimeridian.
 *
 * Coordinates are route nodes rather than recovered historical tracks. The
 * interpolated boundary latitude is a rendering seam, not an additional claim
 * about a ship's position. Outputs can be projected independently without a
 * giant line running through the centre of a flat world map.
 */
export function splitAntimeridian(points) {
  if (!Array.isArray(points) || points.length === 0) return [];
  const valid = points.map(point => {
    if (!Array.isArray(point) || point.length < 2 || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) {
      throw new TypeError('Route coordinates must be finite [longitude, latitude] pairs');
    }
    if (Math.abs(point[0]) > 180 || Math.abs(point[1]) > 90) {
      throw new RangeError('Route coordinates exceed geographic bounds');
    }
    return [point[0], point[1]];
  });
  const segments = [];
  let segment = [valid[0]];
  for (let i = 1; i < valid.length; i++) {
    const [lon1, lat1] = valid[i - 1];
    const [lon2, lat2] = valid[i];
    const delta = lon2 - lon1;
    if (Math.abs(delta) <= 180) {
      segment.push(valid[i]);
      continue;
    }
    const unwrappedLon2 = lon2 + (delta > 180 ? -360 : 360);
    // -180 and +180 can denote the same physical point; avoid 0/0.
    if (Math.abs(unwrappedLon2 - lon1) < 1e-10) {
      if (segment.length > 1) segments.push(segment);
      segment = [[lon2, lat2]];
      continue;
    }
    const boundary = unwrappedLon2 > 180 ? 180 : -180;
    const fraction = (boundary - lon1) / (unwrappedLon2 - lon1);
    const crossingLat = lat1 + fraction * (lat2 - lat1);
    segment.push([boundary, crossingLat]);
    segments.push(segment);
    segment = [[-boundary, crossingLat], valid[i]];
  }
  if (segment.length) segments.push(segment);
  return segments;
}

/** Return independently drawable projected point groups. Never join the groups. */
export function projectRouteSegments(points, projection) {
  if (typeof projection !== 'function') throw new TypeError('Expected a geographic projection');
  return splitAntimeridian(points).map(segment => segment.map(point => projection(point)))
    .filter(segment => segment.length >= 2 && segment.every(point => point && point.every(Number.isFinite)));
}

/** For uniform draw-on animation across groups, ignoring the geographic seam. */
export function segmentLengths(segments) {
  const lengths = segments.map(segment => segment.slice(1).reduce((sum, point, i) =>
    sum + Math.hypot(point[0] - segment[i][0], point[1] - segment[i][1]), 0));
  return {lengths, total: lengths.reduce((sum, length) => sum + length, 0)};
}
