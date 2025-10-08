import { Heart } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Heart className="w-6 h-6 text-primary fill-primary" />
      {showText && (
        <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Amor&Equilíbrio
        </span>
      )}
    </div>
  );
};
