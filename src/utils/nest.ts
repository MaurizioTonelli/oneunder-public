import { groupBy, mapValues } from "lodash";

let nest: any = function (seq: any, keys: any) {
  if (!keys.length) return seq;
  var first = keys[0];
  var rest = keys.slice(1);
  return mapValues(groupBy(seq, first), function (value) {
    return nest(value, rest);
  });
};

export default nest;
