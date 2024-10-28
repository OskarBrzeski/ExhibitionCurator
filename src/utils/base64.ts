import { BasicObject } from "./types";

const BASE64GLYPHS =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";

function encodeObject(obj: BasicObject): string {
  /*
    1 bit for museum, 23 bits for objectId
    24 bits fit perfectly into 4 digits of Base64
    */
  let final: string = "";
  const museumValue = obj.source === "met" ? 0 : 0x20;
  final += BASE64GLYPHS.charAt(museumValue + ((obj.objectId >> 18) & 0x1f));
  final += BASE64GLYPHS.charAt((obj.objectId >> 12) & 0x3f);
  final += BASE64GLYPHS.charAt((obj.objectId >> 6) & 0x3f);
  final += BASE64GLYPHS.charAt(obj.objectId & 0x3f);
  
  console.log(obj);
  
  console.log(final);

  return final;
}

export function encodeObjects(objects: BasicObject[]): string {
  return objects.map(encodeObject).join("");
}

function decodeObject(data: string): BasicObject {
  /*
    1 bit for museum, 23 bits for objectId
    24 bits fit perfectly into 4 digits of Base64
    */
  let final: number = 0;
  final += BASE64GLYPHS.indexOf(data[0]) << 18;
  final += BASE64GLYPHS.indexOf(data[1]) << 12;
  final += BASE64GLYPHS.indexOf(data[2]) << 6;
  final += BASE64GLYPHS.indexOf(data[3]);

  return {
    source: (final >>> 23) & 1 ? "cle" : "met",
    objectId: final & 0x7fffff,
  };
}

export function decodeObjects(data: string): BasicObject[] {
  const LEN_PER_OBJ = 4;
  const dataLength = data.length / LEN_PER_OBJ;

  const objects = [];
  for (let i = 0; i < dataLength; i++) {
    const start = i * LEN_PER_OBJ;
    const end = start + LEN_PER_OBJ;

    const encodedData = data.slice(start, end);
    objects.push(decodeObject(encodedData));
  }

  return objects;
}
