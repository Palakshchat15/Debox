export default function RoleGuard({ role, children }: any) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.role === role ? children : null;
}
