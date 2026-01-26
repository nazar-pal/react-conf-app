import { Skia } from '@shopify/react-native-skia'

export const source = Skia.RuntimeEffect.Make(`
uniform float sheetAnim;
uniform vec2 size;

vec4 main(vec2 pos) {
  vec2 normalized = pos/vec2(256);
  vec2 offset;
  float dist;
  offset = (pos - vec2(size.x/2, -size.y));
  dist = sqrt(pow(offset.x, 2.0) + pow(offset.y, 2.0)) / sqrt(pow(size.x/2, 2.0) + pow(size.y/2, 2.0));
  float anim = 1 - sheetAnim;

  offset = (pos - vec2(size.x*anim, size.y*anim));
  dist = sqrt(pow(offset.x, 2.0) + pow(offset.y, 2.0)) / sqrt(pow(size.x/2, 2.0) + pow(size.x/2, 2.0)) - pow(sheetAnim,1.3);
  float mixVal = max(0.0,dist);
  vec4 colorA = vec4(0.345, 0.769, 0.863, 1.0) + vec4(1.0, normalized.x, normalized.y,1.0) / 6.0;
  vec4 colorB = vec4(0.031, 0.494, 0.643, 1.0);

  vec4 color = mix(colorA, colorB, mixVal);
  return vec4(color);
}`)!
