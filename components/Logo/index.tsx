import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="sm:block hidden">
      <Link href="/" className="flex items-center space-x-3">
        <Image
          src="/logo/png/logo-no-background.png"
          alt="Hotel Valhalla Logo"
          width={52}
          height={52}
        />
        <p className="text-lg font-bold text-primary">Valhalla</p>
      </Link>
    </div>
  );
};

export default Logo;
