import { Check, CheckCircle, TriangleAlert } from "lucide-react";
import { PropsWithChildren } from "react";

interface MessageProps extends PropsWithChildren {
  error?: boolean;
  message: string;
}

export default function Message({ error = false, message }: MessageProps) {
  return (
    <div
      className={`flex items-center gap-3 p-4 text-xs rounded-md ${
        error ? "bg-red-200 text-red-800 " : "bg-green-200 text-green-800 "
      }`}
    >
      <div>
        {error ? <TriangleAlert size={15} /> : <CheckCircle size={15} />}
      </div>
      {message}
    </div>
  );
}
