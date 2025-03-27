import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface FooterProps {
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: string[];
}

const Footer: React.FC<FooterProps> = ({
  theme,
  setTheme,
  availableThemes,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <footer
      className={`fixed bottom-4 left-4 p-3 rounded-lg shadow-lg transition-all 
        ${
          isExpanded
            ? "bg-background text-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      style={{
        display: "flex",
        flexDirection: isExpanded ? "row" : "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Button onClick={() => setIsExpanded(!isExpanded)} variant="outline">
        {isExpanded ? "Close" : "Themes"}
      </Button>

      {isExpanded && (
        <>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex gap-2">
            {availableThemes.map((t) => (
              <Button
                key={t}
                onClick={() => setTheme(t)}
                variant={theme === t ? "default" : "outline"}
                className="capitalize"
              >
                {t}
              </Button>
            ))}
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
