import { Compass, Home, User } from "lucide-react";

const navItems = [
  { label: "Trang chủ", icon: Home },
  { label: "Khám phá", icon: Compass },
  { label: "Hồ sơ", icon: User },
];

export function SideNavigation() {
  return (
    <aside className="side-nav" aria-label="Điều hướng chính">
      <div className="brand-mark">TN</div>
      <nav>
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              className={index === 0 ? "nav-button active" : "nav-button"}
              key={item.label}
              type="button"
            >
              <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export function BottomNavigation() {
  return (
    <footer className="bottom-nav" aria-label="Điều hướng chính">
      {navItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            className={index === 0 ? "nav-icon-button active" : "nav-icon-button"}
            key={item.label}
            type="button"
          >
            <Icon aria-hidden="true" size={23} strokeWidth={2.2} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </footer>
  );
}
