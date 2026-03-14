// Centralized tag list used across the app:
// Registration, Profile, Create/Edit Recipe, HomePage browse section
export const AVAILABLE_TAGS = [
  "Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free", "Keto",
  "Low-Carb", "High-Protein", "Dairy-Free", "Nut-Free", "Spicy Food",
  "Sweet Dishes", "Healthy Eating", "Quick Meals", "Traditional Cuisine",
  "International Cuisine", "Baking", "Grilling", "Breakfast", "Desserts",
  "Comfort Food", "Soup", "Salad", "Snack", "Appetizer",
  "Main Course", "Side Dish", "Beverage", "Budget-Friendly"
] as const;

export type AvailableTag = typeof AVAILABLE_TAGS[number];

// Emoji map for tags displayed on homepage browse section
export const TAG_EMOJI_MAP: Record<string, string> = {
  "Vegetarian": "🥬",
  "Non-Vegetarian": "🍗",
  "Vegan": "🌱",
  "Gluten-Free": "🌾",
  "Keto": "🥑",
  "Low-Carb": "🥩",
  "High-Protein": "💪",
  "Dairy-Free": "🥛",
  "Nut-Free": "🥜",
  "Spicy Food": "🌶️",
  "Sweet Dishes": "🍰",
  "Healthy Eating": "🥗",
  "Quick Meals": "⚡",
  "Traditional Cuisine": "🍛",
  "International Cuisine": "🌍",
  "Baking": "🧁",
  "Grilling": "🔥",
  "Breakfast": "🍳",
  "Desserts": "🍮",
  "Comfort Food": "🍲",
  "Soup": "🍜",
  "Salad": "🥗",
  "Snack": "🍿",
  "Appetizer": "🍢",
  "Main Course": "🍽️",
  "Side Dish": "🥘",
  "Beverage": "🥤",
  "Budget-Friendly": "💰",
};

// Color map for homepage tag cards
export const TAG_COLOR_MAP: Record<string, string> = {
  "Vegetarian": "bg-green-100 dark:bg-green-900/30",
  "Non-Vegetarian": "bg-red-100 dark:bg-red-900/30",
  "Vegan": "bg-emerald-100 dark:bg-emerald-900/30",
  "Gluten-Free": "bg-amber-100 dark:bg-amber-900/30",
  "Keto": "bg-lime-100 dark:bg-lime-900/30",
  "Low-Carb": "bg-orange-100 dark:bg-orange-900/30",
  "High-Protein": "bg-blue-100 dark:bg-blue-900/30",
  "Dairy-Free": "bg-sky-100 dark:bg-sky-900/30",
  "Nut-Free": "bg-yellow-100 dark:bg-yellow-900/30",
  "Spicy Food": "bg-red-100 dark:bg-red-900/30",
  "Sweet Dishes": "bg-pink-100 dark:bg-pink-900/30",
  "Healthy Eating": "bg-teal-100 dark:bg-teal-900/30",
  "Quick Meals": "bg-violet-100 dark:bg-violet-900/30",
  "Traditional Cuisine": "bg-orange-100 dark:bg-orange-900/30",
  "International Cuisine": "bg-indigo-100 dark:bg-indigo-900/30",
  "Baking": "bg-pink-100 dark:bg-pink-900/30",
  "Grilling": "bg-red-100 dark:bg-red-900/30",
  "Breakfast": "bg-yellow-100 dark:bg-yellow-900/30",
  "Desserts": "bg-rose-100 dark:bg-rose-900/30",
  "Comfort Food": "bg-amber-100 dark:bg-amber-900/30",
  "Soup": "bg-orange-100 dark:bg-orange-900/30",
  "Salad": "bg-green-100 dark:bg-green-900/30",
  "Snack": "bg-purple-100 dark:bg-purple-900/30",
  "Appetizer": "bg-cyan-100 dark:bg-cyan-900/30",
  "Main Course": "bg-slate-100 dark:bg-slate-900/30",
  "Side Dish": "bg-stone-100 dark:bg-stone-900/30",
  "Beverage": "bg-sky-100 dark:bg-sky-900/30",
  "Budget-Friendly": "bg-emerald-100 dark:bg-emerald-900/30",
};
