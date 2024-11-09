import Button from "@/components/Form/Button";
import Meta from "@/components/Meta";
import useRedirect from "@/hooks/useRedirect";

function FourNotFourPage() {
  const { replaceWithHome } = useRedirect();

  return (
    <>
      <Meta
        title="Page not found - Hotel Valhalla"
        description="There is no page with this url."
      />
      <section className="flex items-center justify-center h-300 pt-5 sm:pt-14">
        <div className="py-14 px-14 sm:px-24 bg-primary-lighter rounded-xl text-center text-base">
          <h1 className="font-bold text-4xl tracking-widest mb-1">404</h1>
          <p className="mb-2">Page not found</p>
          <Button
            variant="contained"
            label="Back to Home"
            onClick={replaceWithHome}
          />
        </div>
      </section>
    </>
  );
}

export default FourNotFourPage;
