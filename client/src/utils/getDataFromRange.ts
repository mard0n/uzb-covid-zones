export const getDataFromRange = ({
  data,
  from,
  minVisible,
  to,
  range,
}: {
  data: string[];
  from: string;
  minVisible: number;
  to?: string;
  range?: number;
}) => {
  const _from = from;
  const fromId = data.findIndex((data) => data === from);
  const _to = to ? to : data[fromId + (range || 0)];
  const toId = data.findIndex((data) => data === _to);
  const _range = range ? range : toId - fromId;


  let left: { index: number; value: string },
    right: { index: number; value: string };

  if (!_to) {
    if(_range > 0){
      left = { index: fromId, value: _from };
      right = { index: data.length, value: data[data.length] };
    } else {
      right = { index: fromId, value: _from };
      left = { index: 0, value: data[0] };
    }
  } else {
    if (fromId <= toId) {
      // from first
      left = { index: fromId, value: _from };
      right = { index: toId, value: _to };
    } else {
      // to first
      left = { index: toId, value: _to };
      right = { index: fromId, value: _from };
    }
  }

  const diff = Math.abs(right.index - left.index);


  if (diff >= minVisible) {
    return {
      from: left.value,
      to: right.value,
      range: diff,
      data: data.filter(
        (d, index) => index >= left.index && index <= right.index
      ),
    };
  } else {
    if (left.index === 0) {
      return {
        from: left.value,
        to: data[left.index + minVisible],
        range: minVisible,
        data: data.filter(
          (d, index) => index >= left.index && index <= left.index + minVisible
        ),
      };
    } else if (right.index === data.length) {
      return {
        from: data[right.index - minVisible],
        to: right.value,
        range: minVisible,
        data: data.filter(
          (d, index) =>
            index >= right.index - minVisible && index <= right.index
        ),
      };
    } else {
      return {
        from: left.value,
        to: data[left.index + minVisible],
        range: minVisible,
        data: data.filter(
          (d, index) => index >= left.index && index <= left.index + minVisible
        ),
      };
    }
  }
};

export const getRangeFromData = (
  from: string,
  to: string,
  data: string[],
  minVisible: number
) => {};
