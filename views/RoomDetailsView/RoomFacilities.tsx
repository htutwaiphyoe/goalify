type RoomFacilitiesProps = {
  facilities: Facility[];
};

export default function RoomFacilities({ facilities }: RoomFacilitiesProps) {
  return (
    <div>
      <h2 className="font-bold text-xl mb-2">Facilities</h2>
      <ul className="list-disc ml-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-500">
        {facilities.map((facility) => (
          <li key={facility._id}>
            <p> {facility.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
