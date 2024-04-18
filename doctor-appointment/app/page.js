"use client"
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import Doctors from "./_components/Doctors";


export default function Home() {
  return (
    <div className="bg-blue-100">
      {/* Hero Section */}
      <Hero/>

      {/* Search Bar + Category */}
      <CategorySearch/>

      {/* Todos */}
      <Doctors/>
    </div>
  );
}
