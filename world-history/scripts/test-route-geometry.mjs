import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {geoNaturalEarth1} from 'd3-geo';
import {splitAntimeridian, projectRouteSegments, segmentLengths} from '../src/routes-geometry.mjs';
assert.deepEqual(splitAntimeridian([[20,5],[30,7]]), [[[20,5],[30,7]]]);
assert.deepEqual(splitAntimeridian([[170,10],[-170,20]]), [[[170,10],[180,15]],[[-180,15],[-170,20]]]);
assert.deepEqual(splitAntimeridian([[-175,13],[175,13]]), [[[-175,13],[-180,13]],[[180,13],[175,13]]]);
assert.throws(()=>splitAntimeridian([[181,2]]), RangeError);
const routes=JSON.parse(readFileSync(new URL('../data/routes.json', import.meta.url)));
const pacific=routes.find(route=>route.id==='silver-pacific');
const groups=splitAntimeridian(pacific.points);
assert.equal(groups.length, 2);
const projection=geoNaturalEarth1().translate([0,0]).scale(286);
const projected=projectRouteSegments(pacific.points,projection);
const length=segmentLengths(projected);
assert(length.total>0);
// The split must never introduce a segment traversing most of the world map.
for(const group of projected)for(let i=1;i<group.length;i++)assert(Math.abs(group[i][0]-group[i-1][0])<300);
console.log('Geographic route seam tests passed; silver-pacific has 2 independent projected groups.');
