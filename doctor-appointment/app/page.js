"use client"
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import Doctors from "./_components/Doctors";
import TodoApp from "./_components/TodoApp";


export default function Home() {
  return (
    <div className="bg-blue-100">
      {/* Hero Section */}
      <Hero/>

      {/* Search Bar + Category */}
      <CategorySearch/>
      {/* Doctors Collectoion */}
      <Doctors/>
      {/* Todos */}
      <TodoApp/>
      
    </div>
  );
}
