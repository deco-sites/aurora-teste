import { Signal } from "@preact/signals-core";

export const handleDataChange = <T, K>(
  setSignal: Signal<T>,
  valueKey: keyof T,
  value: K,
): void => {
  setSignal.value = { ...setSignal.value, [valueKey]: value };
  //setSignal({ ...state, [valueKey]: value })
};

export const handleArrDataChange = <T, Y, K extends Y[keyof Y]>(
  setSignal: Signal<T>,
  valueKey: keyof T,
  value: K,
  targetItem: Y,
  itemIdKey: keyof Y,
  itemKey: keyof Y,
): void => {
  const itemCopy = setSignal.value[valueKey] as Y[];
  const itemIndex = itemCopy.findIndex(
    (item) => item[itemIdKey] == targetItem[itemIdKey],
  );

  if (itemIndex > -1) {
    itemCopy[itemIndex][itemKey] = value;
  }

  setSignal.value = { ...setSignal.value, [valueKey]: itemCopy };
};
