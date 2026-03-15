const RecipeLoader = ({ message = "Loading recipes..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      {/* Logo-based animation: dark circle → green house → animated fork & spoon */}
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Dark circle background */}
          <circle cx="50" cy="50" r="48" fill="hsl(var(--foreground))" />

          {/* Green house shape */}
          <g>
            {/* House roof (triangle) */}
            <polygon
              points="50,18 22,45 78,45"
              fill="hsl(var(--primary))"
            />
            {/* House body (rectangle) */}
            <rect x="28" y="45" width="44" height="32" fill="hsl(var(--primary))" />
          </g>

          {/* Fork - animated rotation (scaled down) */}
          <g className="origin-center animate-fork-rock" style={{ transformOrigin: '43px 52px' }}>
            <g fill="white">
              <rect x="41" y="52" width="3.5" height="18" rx="1.75" />
              <rect x="37" y="34" width="2" height="14" rx="1" />
              <rect x="40.5" y="34" width="2" height="14" rx="1" />
              <rect x="44" y="34" width="2" height="14" rx="1" />
              <rect x="37" y="47" width="9" height="5" rx="1.5" />
            </g>
          </g>

          {/* Spoon - animated rotation (scaled down, fully opaque) */}
          <g className="origin-center animate-spoon-rock" style={{ transformOrigin: '57px 52px' }}>
            <g fill="white">
              <rect x="55.5" y="52" width="3.5" height="18" rx="1.75" />
              <ellipse cx="57" cy="39" rx="6" ry="8" />
            </g>
          </g>
        </svg>
      </div>

      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
};

export default RecipeLoader;
