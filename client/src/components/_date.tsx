import { Badge } from "@/components/ui/badge";

type DateComponentProps = {
  labelContent: string;
  date: string;
};

export function _Date({ labelContent, date }: DateComponentProps) {
  return (
    <div className="flex items-center space-x-2">
      <label>{labelContent}</label>
      <Badge variant="outline">{date}</Badge>
    </div>
  );
}