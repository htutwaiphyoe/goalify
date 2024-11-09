type ReportCardProps = {
  title: string;
  value: string;
  description: string;
};

function ReportCard({ title, value, description }: ReportCardProps) {
  return (
    <div className="rounded-xl shadow-sm border p-6">
      <p className="text-lg mb-2 font-bold">{title}</p>
      <h3 className="text-4xl font-bold mb-2">{value}</h3>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
}

export default ReportCard;
