export async function fetchTours() {
  try {
    const res = await fetch("/api/v1/tours");
    const data = await res.json();
    return data?.data?.doc ?? [];
  } catch (err) {
    console.error("Failed to fetch tours:", err);
    return [];
  }
}

export async function fetchTourBySlug(slug) {
  const res = await fetch(`/api/v1/tours/slug/${slug}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 404) {
    const errorData = await res.json();
    throw { code: 404, message: errorData.message || "Page not found!" };
  }

  if (!res.ok) {
    const errorData = await res.json();
    throw {
      code: res.status,
      message: errorData.message || "Something went wrong.",
    };
  }

  const data = await res.json();
  return data?.data?.tour ?? [];
}

export async function fetchMyBookings() {
  try {
    const res = await fetch("/api/v1/tours/my-bookings", {
      credentials: "include", // include cookies if protected route
    });
    const data = await res.json();
    return data?.data?.tours ?? [];
  } catch (err) {
    console.error("Failed to fetch user bookings:", err);
    return [];
  }
}
