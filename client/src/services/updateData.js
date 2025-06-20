export async function updateUserData(formData) {
  const res = await fetch("/api/v1/users/updateMe", {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    if (data?.error?.errors) {
      const firstError = Object.values(data.error.errors)[0];
      throw new Error(firstError.message || "Signup failed");
    }

    throw new Error(data.message || "Signup failed");
  }

  return data;
}

export async function updatePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}) {
  const res = await fetch("/api/v1/users/updateMyPassword", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      passwordCurrent: currentPassword,
      password: newPassword,
      passwordConfirm: confirmPassword,
    }),
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    if (data?.error?.errors) {
      const firstError = Object.values(data.error.errors)[0];
      throw new Error(firstError.message || "Signup failed");
    }

    throw new Error(data.message || "Signup failed");
  }

  return data;
}
