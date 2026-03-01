interface TimetableCardProps {
  day: string;
  classes: { name: string; time: string }[];
}

export function TimeTableCard({ day, classes }: TimetableCardProps) {
  return (
    <div className="text-center bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">{day}</h3>
      <div className="space-y-2">
        {classes.length > 0 ? (
          classes.map((cls, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm ${
                idx === 0
                  ? "bg-blue-100 text-blue-900"
                  : "bg-green-100 text-green-900"
              }`}
            >
              <p className="font-medium">{cls.name}</p>
              <p>{cls.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No classes</p>
        )}
      </div>
    </div>
  );
}
