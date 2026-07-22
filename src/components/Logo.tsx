import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  className?: string;
};

const sizeMap = {
  sm: { box: "w-8 h-8", img: 28, text: "text-lg" },
  md: { box: "w-9 h-9 sm:w-10 sm:h-10", img: 36, text: "text-xl sm:text-3xl lg:text-4xl" },
  lg: { box: "w-16 h-16", img: 56, text: "text-2xl" },
};

export default function Logo({
  size = "md",
  showText = true,
  href = "/",
  className = "",
}: LogoProps) {
  const { box, img, text } = sizeMap[size];

  const content = (
    <div className={`flex items-center gap-2 sm:gap-3 min-w-0 ${className}`}>
      <div className={`${box} shrink-0 flex items-center justify-center`}>
        <Image
          src="/logo.png"
          alt="Recruma logo"
          width={img}
          height={img}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={`text-slate-900 font-black font-montserrat tracking-tight truncate ${text}`}>
          Recruma
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex min-w-0">
        {content}
      </Link>
    );
  }

  return content;
}
