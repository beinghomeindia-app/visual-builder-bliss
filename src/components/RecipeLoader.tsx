const RecipeLoader = ({ message = "Loading recipes..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      {/* Fork & Spoon Animation */}
      <div className="relative w-20 h-20">
        {/* Fork - left side, rocks left */}
        <svg
          className="absolute left-0 top-0 w-10 h-20 origin-bottom-center animate-fork-rock"
          viewBox="0 0 40 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="text-primary">
            {/* Fork handle */}
            <rect x="17" y="35" width="6" height="40" rx="3" fill="currentColor" />
            {/* Fork prongs */}
            <rect x="8" y="5" width="3" height="28" rx="1.5" fill="currentColor" />
            <rect x="15" y="5" width="3" height="28" rx="1.5" fill="currentColor" />
            <rect x="22" y="5" width="3" height="28" rx="1.5" fill="currentColor" />
            <rect x="29" y="5" width="3" height="28" rx="1.5" fill="currentColor" />
            {/* Fork base connecting prongs */}
            <rect x="8" y="30" width="24" height="8" rx="2" fill="currentColor" />
          </g>
        </svg>

        {/* Spoon - right side, rocks right */}
        <svg
          className="absolute right-0 top-0 w-10 h-20 origin-bottom-center animate-spoon-rock"
          viewBox="0 0 40 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="text-primary">
            {/* Spoon handle */}
            <rect x="17" y="38" width="6" height="38" rx="3" fill="currentColor" />
            {/* Spoon head */}
            <ellipse cx="20" cy="18" rx="14" ry="16" fill="currentColor" />
            {/* Spoon inner (hollow) */}
            <ellipse cx="20" cy="16" rx="9" ry="10" fill="hsl(var(--background))" />
          </g>
        </svg>
      </div>

      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
};

export default RecipeLoader;
