import { Home, BookOpen, Plus, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Recipes", path: "/recipes" },
    { icon: Plus, label: "Add", path: "/create-recipe", isCenter: true },
    { icon: Heart, label: "Favorites", path: "/favorites" },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="px-4 pb-6">
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl">
            <div className="flex items-center justify-around h-16 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                if (item.isCenter) {
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 touch-manipulation min-w-[64px]"
                    >
                      <div className="bg-primary rounded-full p-3 -mt-4 shadow-lg text-primary-foreground">
                        <Icon size={24} strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] font-semibold text-foreground mt-0.5">
                        {item.label}
                      </span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-300 touch-manipulation min-w-[56px] ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-primary/10 rounded-xl -top-3 shadow-lg border-2 border-primary/20" />
                    )}
                    <div className={`relative z-10 transition-all duration-300 ${active ? "scale-110" : ""}`}>
                      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                    </div>
                    <span className={`relative z-10 text-[10px] font-medium transition-all duration-300 ${active ? "font-semibold" : ""}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
        <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path || item.label}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 touch-manipulation active:scale-95 min-w-[44px] min-h-[44px] ${
                  active
                    ? "text-primary-foreground bg-primary shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;
