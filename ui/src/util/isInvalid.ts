export function isInvalid({
  errors,
  values
}: {
  errors: {};
  values: {};
}) {
  if (Object.keys(errors).length > 0) {
    return true;
  } else {
    return !Object.values(values).every(Boolean)
  }
}