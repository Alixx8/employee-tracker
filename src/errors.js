class ValidationError {
  constructor(errs) {
    this.errs = errs;
  }
}

function validateNewEmployee(data) {
  let errs = [];
  if (!data.name) {
    errs.push("missing 'name' field");
  }
  if (!data.email) {
    errs.push("missing 'email' field");
  }
  if (!data.age) {
    errs.push("missing 'age' field");
  }
  if (!data.role) {
    errs.push("missing 'role' field");
  }

  if (errs.length > 0) {
    throw new ValidationError(errs);
  }
}

function validateNewRating(data) {
  let errs = [];
  if (!data.days) {
    errs.push("missing 'days' field");
  }
  if (!data.rating) {
    errs.push("missing 'days' field");
  }

  if (errs.length > 0) {
    throw new ValidationError(errs);
  }
}

function validateNewUser(data) {
  let errs = [];
  if (!data.email) {
    errs.push("missing 'email' field");
  }
  if (!data.password) {
    errs.push("missing 'password' field");
  }

  if (errs.length > 0) {
    throw new ValidationError(errs);
  }
}

export {
  ValidationError,
  validateNewEmployee,
  validateNewRating,
  validateNewUser,
};
