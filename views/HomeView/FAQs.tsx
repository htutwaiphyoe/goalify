import { faqs } from "@/data/constant";
import Accordion from "@/components/Accordion";

function FAQs() {
  return (
    <div className="px-0 sm:px-5 xl:px-10 mx-auto max-w-800">
      <h2 className="text-center text-4xl font-bold mb-7">FAQs</h2>
      <hr className="mx-auto w-10 mb-7" />
      <div className="grid grid-cols-1 gap-5">
        {faqs.map((faq, i) => (
          <div key={i} className="w-full h-full">
            <Accordion question={<p className="text-base">{faq.name}</p>}>
              <p className="text-base text-justify text-gray-700">
                {faq.description}
              </p>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
