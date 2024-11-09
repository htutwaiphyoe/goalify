import { services } from "@/data/constant";
import Image from "next/image";

function Services() {
  return (
    <div className="px-0 sm:px-5 xl:px-10">
      <h2 className="text-center text-4xl font-bold mb-7">Our Services</h2>
      <hr className="mx-auto w-100 mb-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {services.map((service) => (
          <div key={service.name} className="w-full h-full overflow-hidden">
            <div className="h-300 overflow-hidden rounded-2xl">
              <Image
                src={`/services/${service.image}`}
                alt={service.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="py-5 grid gap-3">
              <h3 className="text-2xl font-bold text-center uppercase">
                {service.name}
              </h3>
              <p className="text-lg text-justify">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
