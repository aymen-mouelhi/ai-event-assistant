export default function LogoutButton() {
  const handleLogout = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "logout" }),
    });

    if (res.ok) {
      alert("Logged out successfully!");
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
