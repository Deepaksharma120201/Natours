export async function handleApiError(
  res,
  defaultMessage = "Something went wrong!"
) {
  let message = defaultMessage;

  // Try to parse response JSON if available
  try {
    const data = await res.json();
    if (data?.message) message = data.message;
  } catch {
    message =
      "Cannot connect to server. Please check your internet connection.";
  }

  throw new Error(message);
}
