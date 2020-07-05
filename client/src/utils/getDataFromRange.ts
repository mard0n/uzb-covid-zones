export const getDataFromRange = ({
  allData,
  from,
  minVisible,
  to,
  range,
}: {
  allData: string[];
  from: string;
  minVisible: number;
  to?: string;
  range?: number;
}) => {
  const fromIndex = allData.findIndex((d) => d === from);
  let toIndex: any;
  let left: any, right: any;

  if (to) {
    toIndex = allData.findIndex((d) => d === to);
    if (fromIndex <= toIndex) {
      // from first
      left = { index: fromIndex, value: from };
      right = { index: toIndex, value: to };
    } else {
      // to first
      left = { index: toIndex, value: to };
      right = { index: fromIndex, value: from };
    }

    const diff = right.index - left.index;

    if (diff >= minVisible) {
      return {
        from: left.value,
        to: right.value,
        range: diff,
        data: allData.filter(
          (d, index) => index >= left.index && index <= right.index
        ),
      };
    } else {
      if (allData[left.index + minVisible]) {
        return {
          from: left.value,
          to: allData[left.index + minVisible],
          range: minVisible,
          data: allData.filter(
            (d, index) =>
              index >= left.index && index <= left.index + minVisible
          ),
        };
      } else {
        return {
          from: allData[right.index - minVisible],
          to: right.value,
          range: minVisible,
          data: allData.filter(
            (d, index) =>
              index >= right.index - minVisible && index <= right.index
          ),
        };
      }
    }
  } else if (range) {
    if (range >= minVisible) {
      toIndex = fromIndex + range;
    } else {
      toIndex = fromIndex + minVisible;
    }
    if (fromIndex <= toIndex) {
      // from first
      left = { index: fromIndex, value: from };
      right = { index: toIndex, value: allData[toIndex] };
    } else {
      // to first
      left = { index: toIndex, value: allData[toIndex] };
      right = { index: fromIndex, value: from };
    }
  } else {
  }
  // const fromIndex = data.findIndex((d) => d === from);
  // const toIndex = fromIndex + range;
  // return data.filter((d, index) => {
  //   if (fromIndex <= toIndex) {
  //     return index >= fromIndex && index <= toIndex;
  //   } else {
  //     return index <= fromIndex && index >= toIndex;
  //   }
  // });
};

export const getRangeFromData = (
  from: string,
  to: string,
  data: string[],
  minVisible: number
) => {};
