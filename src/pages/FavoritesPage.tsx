import { Heart, Loader2, Search, ChefHat, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/AppHeader";
import RecipeCard from "@/components/RecipeCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FavoritesService, type FavoriteItem } from "@/api/favoritesService";
import { toast } from "sonner";

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchFavorites(); }, []);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await FavoritesService.getFavorites();
      if (response.success) {
        setFavoriteRecipes(response.data && Array.isArray(response.data) ? response.data : []);
      } else {
        setError(response.message || "Failed to load favorites");
      }
    } catch {
      setError("Failed to load favorites. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-20" style={{ position: "relative" }}>
      <AppHeader />

      <div className="bg-card border-b border-border px-4 py-3">
        <h1 className="text-xl font-semibold text-foreground">Favorites</h1>
      </div>

      <main className="px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading favorites...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Error loading favorites</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={fetchFavorites} className="bg-primary hover:bg-primary/90 text-primary-foreground">Try Again</Button>
          </div>
        ) : favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteRecipes.map((item) => (
              <RecipeCard
                key={item.recipe_id}
                recipe_id={item.recipe_id}
                name={item.recipe.name}
                image_url={item.recipe.image_url}
                rating={item.recipe.rating}
                cook_time={item.recipe.cook_time}
                views={item.recipe.views}
                is_popular={item.recipe.is_popular}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-3">No favorites yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Add your favorites and you can check them later. Discover amazing recipes and save the ones you love!
            </p>
            <div className="space-y-4 max-w-sm mx-auto">
              <Link to="/recipes" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Search className="w-4 h-4" /> Browse All Recipes
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/recipes?category=Popular" className="block">
                  <Button variant="outline" className="w-full gap-2"><Star className="w-4 h-4" /> Popular</Button>
                </Link>
                <Link to="/create-recipe" className="block">
                  <Button variant="outline" className="w-full gap-2"><ChefHat className="w-4 h-4" /> Create Recipe</Button>
                </Link>
              </div>
            </div>
            <div className="mt-8 p-4 bg-muted/30 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">💡 <strong>Tip:</strong> Click the heart icon on any recipe to add it to your favorites!</p>
            </div>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default FavoritesPage;
