import Link from "next/link";
import { routes } from "@/data/constant";

export default function Footer() {
  return (
    <footer className="w-full mt-14">
      <div className="bg-primary-lighter py-10 px-3 sm:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
        <div>
          <ul className="grid gap-3">
            <li className="font-bold text-2xl">Resources</li>
            <li>
              <Link href={routes.home}>Home</Link>
            </li>
            <li>
              <Link href={routes.rooms}>Rooms</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="grid gap-3">
            <li className="font-bold text-2xl">Contact Us</li>
            <li>128, Wingabar Lane, Kalaw City, Myanmar</li>
            <li>hello@valhalla.com</li>
            <li>+959123456789</li>
          </ul>
        </div>
        <div>
          <ul className="grid gap-3">
            <li className="font-bold text-2xl">Services</li>
            <li>Swimming pool</li>
            <li>Restaurant</li>
            <li>Sky bar</li>
          </ul>
        </div>
        <div>
          <ul className="grid gap-3">
            <li className="font-bold text-2xl">Payments</li>
            <li>Cards (Stripe)</li>
            <li>Bankings (AYA, KBZ, CB)</li>
            <li>Pays (AYA, KBZ, CB)</li>
          </ul>
        </div>
      </div>
      <div className="text-center px-3 py-10 bg-primary text-base text-white">
        <p>Copyright&copy;2023 - Hotel Valhalla. All Rights Reserved.</p>
        <p>Developed By Htut Wai Phyoe.</p>
      </div>
    </footer>
  );
}
