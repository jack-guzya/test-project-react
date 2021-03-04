type ErrorCb = (err: Error) => void;

export const errorHandler = <C extends (...args: Array<any>) => any>(
  cb: C,
  errorCb?: ErrorCb
) => async (...args: Parameters<C>): Promise<ReturnType<C> | void> => {
  try {
    console.log(args);
    return await cb(...args);
  } catch (err) {
    if (errorCb) {
      return errorCb(err);
    }

    console.log('Something went wrong. Please try again later');
  }
};
