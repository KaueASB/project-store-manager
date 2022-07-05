// const ThrowErrors = (err) => {
//   const error = new Error(err);
//   error.name = 'ValidationError';
//   throw error;
// };

const runSchema = (schema) => async (unknown) => {
  const result = await schema.validateAsync(unknown);
  console.log('result do runSchema', result);
  return result;
};

function ErrorHandler(err, _req, res, _next) {
  const { message } = err;
  switch (message) {
    case '"name" is required':
      res.status(400).json({ message });
      break;
    case '"name" length must be at least 5 characters long':
      res.status(422).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
}

module.exports = {
  ErrorHandler,
  runSchema,
};