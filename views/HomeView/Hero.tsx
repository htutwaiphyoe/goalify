import Button from "@/components/Form/Button";
import useRedirect from "@/hooks/useRedirect";

export default function Hero() {
  const { pushToRooms } = useRedirect();

  return (
    <div className="w-full bg-hero bg-no-repeat bg-cover h-500 sm:h-600 bg-bottom-center rounded-2xl">
      <div className="w-full  h-full flex items-center justify-center flex-col space-y-4 p-2">
        <h1 className="lg:text-[3rem] text-[2.5rem] text-white text-center font-extrabold">
          Welcome to Hotel Valhalla
        </h1>
        <p className="text-white text-lg max-w-500 text-center">
          Embark on a journey of relaxation and delight with us. Your palace
          away from home with our service from the heart.
        </p>
        <Button
          label="Explore now"
          variant="contained"
          size="xl"
          color="primary"
          onClick={pushToRooms}
        />
      </div>
    </div>
  );
}
