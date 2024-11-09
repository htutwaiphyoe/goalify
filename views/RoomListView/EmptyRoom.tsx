import SearchOffIcon from "@mui/icons-material/SearchOff";

function EmptyRoom({ title = "No rooms available." }) {
  return (
    <div className="flex items-center justify-center h-300">
      <div className="py-14 px-24 bg-primary-lighter rounded-xl text-center text-base">
        <SearchOffIcon className="!text-6xl" /> <p>{title}</p>
      </div>
    </div>
  );
}

export default EmptyRoom;
