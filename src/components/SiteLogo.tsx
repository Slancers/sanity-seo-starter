import Image from "next/image";
import { site } from "@/config/site";

export default function SiteLogo() {
  return (
    <Image
      src={site.logo.src}
      alt={site.name}
      width={site.logo.width}
      height={site.logo.height}
      priority
      className="ui-logo-img"
    />
  );
}
