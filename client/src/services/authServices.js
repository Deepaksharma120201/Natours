export async function fetchCurrentUser() {
  const res = await fetch("/api/v1/users/currentUser", {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch current user");
  }

  return data.data.user;
}

export async function loginUser({ email, password }) {
  const res = await fetch("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function signupUser({ name, email, password, confirmPassword }) {
  const res = await fetch("/api/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data?.error?.errors) {
      const firstError = Object.values(data.error.errors)[0];
      throw new Error(firstError.message || "Signup failed");
    }

    throw new Error(data.message || "Signup failed");
  } else {
    return data;
  }
}

export async function logoutUser() {
  const res = await fetch("/api/v1/users/logout", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
}
