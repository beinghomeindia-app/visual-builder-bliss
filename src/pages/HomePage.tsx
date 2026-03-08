import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/AppHeader";
import RecipeCard from "@/components/RecipeCard";
import { useState, useEffect } from "react";
import { RecipeService, type RecipeListItem } from "@/api/recipeService";

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredRecipes, setFeaturedRecipes] = useState<RecipeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        let response;
        try {
          response = await RecipeService.getPopularRecipes(1, 6);
        } catch {
          response = await RecipeService.getRecipes(1, 6);
        }
        if (response.success && response.data) {
          setFeaturedRecipes(response.data);
        } else {
          setFeaturedRecipes([]);
        }
      } catch {
        setFeaturedRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeaturedRecipes();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-20" style={{ position: "relative" }}>
      <AppHeader />

      <div className="px-4 py-4 bg-card border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            className="pl-10 bg-background border-input"
          />
        </div>
      </div>

      <main className="px-4 py-6">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Popular Recipes</h2>
            <Link to="/recipes">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">See all</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-card rounded-lg overflow-hidden shadow-card">
                    <div className="aspect-[4/3] bg-accent/20"></div>
                    <div className="p-4">
                      <div className="h-4 bg-accent/20 rounded mb-2"></div>
                      <div className="h-3 bg-accent/20 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : featuredRecipes.length > 0 ? (
              featuredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.recipe_id}
                  recipe_id={recipe.recipe_id}
                  name={recipe.name}
                  image_url={recipe.image_url}
                  rating={recipe.rating}
                  cook_time={recipe.cook_time}
                  views={recipe.views}
                  is_popular={recipe.is_popular}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No recipes found. <Link to="/create-recipe" className="text-primary hover:underline">Create your first recipe!</Link>
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Browse by Cuisine</h2>
            <Link to="/recipes">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">See all</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: "Indian", emoji: "🍛", color: "bg-orange-100 dark:bg-orange-900/30" },
              { name: "Italian", emoji: "🍝", color: "bg-red-100 dark:bg-red-900/30" },
              { name: "Asian", emoji: "🥢", color: "bg-amber-100 dark:bg-amber-900/30" },
              { name: "Mexican", emoji: "🌮", color: "bg-green-100 dark:bg-green-900/30" },
              { name: "Healthy", emoji: "🥗", color: "bg-emerald-100 dark:bg-emerald-900/30" },
              { name: "Bakery", emoji: "🧁", color: "bg-pink-100 dark:bg-pink-900/30" },
            ].map((cuisine) => (
              <Link
                key={cuisine.name}
                to={`/recipes?search=${encodeURIComponent(cuisine.name)}`}
                className={`${cuisine.color} rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform shadow-sm`}
              >
                <span className="text-3xl">{cuisine.emoji}</span>
                <span className="font-medium text-sm text-foreground">{cuisine.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;
