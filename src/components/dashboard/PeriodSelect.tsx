import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SelectPeriod() {
  return (
    <Select defaultValue="daily">
      <SelectTrigger className="w-[120px] h-6">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
      </SelectContent>
    </Select>
  )
}

