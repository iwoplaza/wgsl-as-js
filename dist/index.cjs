"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  isAlignAttrib: () => isAlignAttrib,
  isAtomic: () => isAtomic,
  isBuiltinAttrib: () => isBuiltinAttrib,
  isDecorated: () => isDecorated,
  isLocationAttrib: () => isLocationAttrib,
  isSizeAttrib: () => isSizeAttrib,
  isWgslArray: () => isWgslArray,
  isWgslData: () => isWgslData,
  isWgslStruct: () => isWgslStruct,
  wgslTypeLiterals: () => wgslTypeLiterals
});
module.exports = __toCommonJS(src_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map