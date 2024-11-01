import Logo from "../ui/Logo";
import AdminRoutes from "./AdminRoutes";

const adminNavigation = [
  { url: "/admin/orders", text: "Orders", blank: false },
  { url: "/admin/products", text: "Products", blank: false },
  { url: "/order/cafe", text: "Show restaurant", blank: true },
];

export default function AdminSidebar() {
  return (
    <>
      <Logo />
      <div className="space-y-3 ">
        <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">
          Navegation
        </p>
        <nav className="flex flex-col">
          {adminNavigation.map(link => (
            <AdminRoutes key={link.url}
              link={link}
            />
          ))}
        </nav>
      </div>
    </>
  );
}
