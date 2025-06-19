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
