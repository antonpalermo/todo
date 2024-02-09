interface TaskCardProps {
  name: string;
}

export default function TaskCard({ name }: TaskCardProps) {
  return (
    <div className="border rounded px-5 py-5">
      <h2 className="font-medium">{name}</h2>
    </div>
  );
}
