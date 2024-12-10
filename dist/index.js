var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/data-type.ts
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
var bool = { type: "bool" };
var f32 = { type: "f32" };
var i32 = { type: "i32" };
var u32 = { type: "u32" };
var vec2f = { type: "vec2f" };
var vec2i = { type: "vec2i" };
var vec2u = { type: "vec2u" };
var vec3f = { type: "vec3f" };
var vec3i = { type: "vec3i" };
var vec3u = { type: "vec3u" };
var vec4f = { type: "vec4f" };
var vec4i = { type: "vec4i" };
var vec4u = { type: "vec3u" };
var mat2x2f = { type: "mat2x2f" };
var mat3x3f = { type: "mat3x3f" };
var mat4x4f = { type: "mat4x4f" };
var struct = (options) => __spreadValues({ type: "struct" }, options);
var array = (elementType, length) => ({ type: "array", elementType, length });
var knownAtomics = {
  i32: { type: "atomic", inner: i32 },
  u32: { type: "atomic", inner: u32 }
};
var atomic = (inner) => knownAtomics[inner.type];
var decorated = (inner, attrib) => {
  var _a;
  return {
    type: "decorated",
    inner,
    attribs: [...(_a = inner == null ? void 0 : inner.attribs) != null ? _a : [], attrib]
  };
};

// src/function.ts
var fn = (options) => __spreadValues({
  type: "fn"
}, options);
function isWgslFn(value) {
  return (value == null ? void 0 : value.type) === "fn";
}
export {
  array,
  atomic,
  bool,
  decorated,
  f32,
  fn,
  i32,
  isAlignAttrib,
  isAtomic,
  isBuiltinAttrib,
  isDecorated,
  isLocationAttrib,
  isSizeAttrib,
  isWgslArray,
  isWgslData,
  isWgslFn,
  isWgslStruct,
  mat2x2f,
  mat3x3f,
  mat4x4f,
  struct,
  u32,
  vec2f,
  vec2i,
  vec2u,
  vec3f,
  vec3i,
  vec3u,
  vec4f,
  vec4i,
  vec4u,
  wgslTypeLiterals
};
//# sourceMappingURL=index.js.map