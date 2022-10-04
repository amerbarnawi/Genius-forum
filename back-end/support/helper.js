export function errorMessage(res) {
  return res
    .status(500)
    .json({ message: "Something went wrong, please try later!" });
}
