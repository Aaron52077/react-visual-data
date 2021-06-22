// Interface data format used to return a unified format
export function resultSuccess(result, { message = "ok" } = {}) {
  return {
    code: 0,
    data: result,
    message,
    type: "success"
  };
}

export function resultPageSuccess(page, pageSize, list, { message = "ok" } = {}) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length
    }),
    message
  };
}

export function resultError(message = "Request failed", { code = 1, result = null } = {}) {
  return {
    code,
    data: result,
    message,
    type: "error"
  };
}

export function pagination(current, pageSize, array) {
  const offset = (current - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}
