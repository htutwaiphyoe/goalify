import { rooms } from "@/data/constant";
import Image from "next/image";

function Rooms() {
  return (
    <div className="px-0 sm:px-5 xl:px-10">
      <h2 className="text-center text-4xl font-bold mb-7">Our Rooms</h2>
      <hr className="mx-auto w-100 mb-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {rooms.map((room) => (
          <div key={room.name} className="w-full h-full overflow-hidden">
            <div className="h-320 overflow-hidden rounded-2xl">
              <Image
                src={`/rooms/${room.image}`}
                alt={room.name}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="py-5 grid gap-3">
              <h3 className="text-2xl font-bold text-center uppercase">
                {room.name}
              </h3>
              <p className="text-lg text-justify">{room.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
