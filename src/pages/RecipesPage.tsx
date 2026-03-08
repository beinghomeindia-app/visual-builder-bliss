import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/AppHeader";
import RecipeCard from "@/components/RecipeCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RecipeService, type RecipeListItem } from "@/api/recipeService";
import { RECIPE_CATEGORIES, type RecipeCategory } from "@/api/config";
import { toast } from "sonner";

const RecipesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDietaryType, setSelectedDietaryType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const categories = ["All", ...RECIPE_CATEGORIES];
  const dietaryTypes = ["All", "Veg", "Non-Veg", "Egg", "Vegan"];

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory, selectedDietaryType, searchQuery]);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await RecipeService.searchRecipes({
        search: searchQuery.trim() || undefined,
        meal_type: selectedCategory !== "All" ? selectedCategory as RecipeCategory : undefined,
        dietary_type: selectedDietaryType !== "All" ? selectedDietaryType : undefined,
        page: 1,
        limit: 20
      });
      if (response.success && response.data) {
        setRecipes(response.data);
      } else {
        toast.error("Failed to load recipes");
        setRecipes([]);
      }
    } catch {
      toast.error("Failed to load recipes");
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => { fetchRecipes(); };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-20" style={{ position: "relative" }}>
      <AppHeader />

      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
              className="pl-10 pr-4 bg-background border-input"
            />
          </div>
          <Select value={selectedDietaryType} onValueChange={setSelectedDietaryType}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue placeholder="Diet" />
            </SelectTrigger>
            <SelectContent>
              {dietaryTypes.map((type) => (
                <SelectItem key={type} value={type} className="text-xs">
                  <div className="flex items-center gap-2">
                    {type === "Veg" && <div className="w-3 h-3 border border-green-600 bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div></div>}
                    {type === "Non-Veg" && <div className="w-3 h-3 border border-red-600 bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div></div>}
                    {type === "Vegan" && <div className="w-3 h-3 border border-green-700 bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div></div>}
                    {type === "Egg" && <div className="w-3 h-3 border border-yellow-600 bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div></div>}
                    <span>{type}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Categories</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className={`cursor-pointer whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-secondary/80"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <main className="px-4 py-6">
        <div className="mb-6">
          <p className="text-muted-foreground">
            {isLoading ? 'Loading...' : `${recipes.length} recipe${recipes.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading recipes...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
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
              ))}
            </div>
            {recipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery ? `No recipes found for "${searchQuery}"` : "No recipes found for this category."}
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default RecipesPage;
