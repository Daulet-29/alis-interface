const getErrorCode = (e) => {
  if (typeof e.code === 'number') {
    return e.code;
  }
  if (typeof e.statusCode === 'number') {
    return e.statusCode;
  }
  return 500;
};
  
const errorHandling = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    // Authentication Error from jwt
    if (e.status === 401) {
      ctx.status = 401;
      ctx.body = {
        message: e.message || 'Authentication Error',
      };
    } else {
      ctx.status = getErrorCode(e);
      ctx.body = {
        message: e.message || 'Internal Server Error',
      };
    }
  }
};

export default errorHandling;