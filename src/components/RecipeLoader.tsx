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

          {/* Fork - animated rotation */}
          <g className="origin-center animate-fork-rock" style={{ transformOrigin: '42px 52px' }}>
            <g fill="white">
              {/* Fork handle */}
              <rect x="40" y="52" width="4" height="20" rx="2" />
              {/* Fork prongs */}
              <rect x="35" y="32" width="2.5" height="16" rx="1" />
              <rect x="39" y="32" width="2.5" height="16" rx="1" />
              <rect x="43" y="32" width="2.5" height="16" rx="1" />
              {/* Fork base */}
              <rect x="35" y="47" width="10.5" height="5" rx="1.5" />
            </g>
          </g>

          {/* Spoon - animated rotation (opposite) */}
          <g className="origin-center animate-spoon-rock" style={{ transformOrigin: '58px 52px' }}>
            <g fill="white">
              {/* Spoon handle */}
              <rect x="56" y="52" width="4" height="20" rx="2" />
              {/* Spoon head */}
              <ellipse cx="58" cy="38" rx="7" ry="9" />
              {/* Spoon inner hollow */}
              <ellipse cx="58" cy="37" rx="4.5" ry="5.5" fill="hsl(var(--primary))" />
            </g>
          </g>
        </svg>
      </div>

      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
};

export default RecipeLoader;
