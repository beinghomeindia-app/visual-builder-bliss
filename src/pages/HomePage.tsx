import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import AppHeader from "@/components/AppHeader";
import RecipeCard from "@/components/RecipeCard";
import { useState, useEffect, useMemo } from "react";
import { RecipeService, type RecipeListItem } from "@/api/recipeService";
import RecipeLoader from "@/components/RecipeLoader";
import { AuthService } from "@/api/auth";
import { UserTagsService, type UserTag } from "@/api/userTagsService";
import { AVAILABLE_TAGS, TAG_EMOJI_MAP, TAG_COLOR_MAP } from "@/data/tags";

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredRecipes, setFeaturedRecipes] = useState<RecipeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const isLoggedIn = AuthService.isAuthenticated();

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

    // Fetch user tags if logged in
    if (isLoggedIn) {
      UserTagsService.getUserTags().then((res) => {
        if (res.success && res.data) {
          setUserTags(res.data);
        }
      });
    }
  }, [isLoggedIn]);

  // Tags to display: user's tags if logged in, else random 6
  const displayTags = useMemo(() => {
    if (isLoggedIn && userTags.length > 0) {
      const tagNames = userTags.map((t) => t.tag);
      return showAllTags ? tagNames : tagNames.slice(0, 6);
    }
    // Not logged in: show 6 random tags
    const shuffled = [...AVAILABLE_TAGS].sort(() => Math.random() - 0.5);
    return showAllTags ? [...AVAILABLE_TAGS] : shuffled.slice(0, 6);
  }, [isLoggedIn, userTags, showAllTags]);

  const totalTagCount = isLoggedIn && userTags.length > 0 ? userTags.length : AVAILABLE_TAGS.length;

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
              <div className="col-span-full">
                <RecipeLoader message="Loading popular recipes..." />
              </div>
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

        {/* Browse by Tags */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Browse by Tags</h2>
            <Link to="/recipes">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">See all</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {displayTags.map((tag) => (
              <Link
                key={tag}
                to={`/recipes?tags=${encodeURIComponent(tag)}`}
                className={`${TAG_COLOR_MAP[tag] || "bg-muted"} rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform shadow-sm`}
              >
                <span className="text-3xl">{TAG_EMOJI_MAP[tag] || "🏷️"}</span>
                <span className="font-medium text-sm text-foreground">{tag}</span>
              </Link>
            ))}
          </div>
          {!showAllTags && totalTagCount > 6 && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllTags(true)}
              >
                View More ({totalTagCount - 6} more)
              </Button>
            </div>
          )}
          {showAllTags && totalTagCount > 6 && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllTags(false)}
              >
                Show Less
              </Button>
            </div>
          )}
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;
