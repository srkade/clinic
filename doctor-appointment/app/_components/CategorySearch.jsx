import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function CategorySearch() {
  return (
    <div className="mb-10 items-center flex flex-col gap-4">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctor</span>
      </h2>
      <h2 className="text-gray-400 text-xl">
        Search Your Doctor And Bool Appointment in OneClick
      </h2>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit"><Search className="h-4 w-4 mr-2" /> Search</Button>
      </div>
    </div>
  );
}

export default CategorySearch;
