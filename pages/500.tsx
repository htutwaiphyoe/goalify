import Button from "@/components/Form/Button";
import Meta from "@/components/Meta";
import useRedirect from "@/hooks/useRedirect";

function ErrorPage() {
  const { replaceWithHome } = useRedirect();

  return (
    <>
      <Meta
        title="Error - Hotel Valhalla"
        description="There is an error occurred in this page."
      />
      <section className="flex items-center justify-center h-300 pt-5 sm:pt-14">
        <div className="py-14 px-14 sm:px-24 bg-primary-lighter rounded-xl text-center text-base">
          <h1 className="font-bold text-4xl tracking-widest mb-1">500</h1>
          <p className="mb-2">Something went wrong!</p>
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

export default ErrorPage;
