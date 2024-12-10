// src/wgsl.ts
var wgslTypeLiterals = [
  "bool",
  "f32",
  "i32",
  "u32",
  "vec2f",
  "vec2i",
  "vec2u",
  "vec3f",
  "vec3i",
  "vec3u",
  "vec4f",
  "vec4i",
  "vec4u",
  "mat2x2f",
  "mat3x3f",
  "mat4x4f",
  "struct",
  "array",
  "atomic",
  "decorated"
];
function isWgslData(value) {
  return wgslTypeLiterals.includes(value == null ? void 0 : value.type);
}
function isWgslArray(schema) {
  return (schema == null ? void 0 : schema.type) === "array";
}
function isWgslStruct(schema) {
  return (schema == null ? void 0 : schema.type) === "struct";
}
function isAtomic(schema) {
  return (schema == null ? void 0 : schema.type) === "atomic";
}
function isAlignAttrib(value) {
  return (value == null ? void 0 : value.type) === "@align";
}
function isSizeAttrib(value) {
  return (value == null ? void 0 : value.type) === "@size";
}
function isLocationAttrib(value) {
  return (value == null ? void 0 : value.type) === "@location";
}
function isBuiltinAttrib(value) {
  return (value == null ? void 0 : value.type) === "@builtin";
}
function isDecorated(value) {
  return (value == null ? void 0 : value.type) === "decorated";
}
export {
  isAlignAttrib,
  isAtomic,
  isBuiltinAttrib,
  isDecorated,
  isLocationAttrib,
  isSizeAttrib,
  isWgslArray,
  isWgslData,
  isWgslStruct,
  wgslTypeLiterals
};
//# sourceMappingURL=index.js.map