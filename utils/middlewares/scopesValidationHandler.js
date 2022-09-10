import response from '../../network/response';

const scopesValidationHandler = (allowedScopes) => {
  return (req, res, next) => {
    if (!req.user || (req.user && !req.user.scopes)) {
      response.error(req, res, 401, 'Unauthorized', 'Authorization Error');
    }
    console.log(req.user)

    const hasAcces = allowedScopes.includes(req.user.permiso)

    if (hasAcces) {
      next();
    } else {
      response.error(req, res, 401, 'Permission denied', 'Scopes Error');
    }
  };
};
export default scopesValidationHandler;