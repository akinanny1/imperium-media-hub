
"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category_id: string | null;
};

type Props = {
  projects: Project[];
  categories: Category[];
};

export default function PortfolioGallery({ projects, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter(
          (project) => project.category_id === selectedCategory
        );

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full px-5 py-2 text-xs font-bold transition ${
            selectedCategory === "all"
              ? "bg-[#D5AE57] text-[#071629]"
              : "border border-white/20 text-gray-300 hover:border-[#D5AE57] hover:text-[#D5AE57]"
          }`}
        >
          ALL WORK
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
              selectedCategory === category.id
                ? "bg-[#D5AE57] text-[#071629]"
                : "border border-white/20 text-gray-300 hover:border-[#D5AE57] hover:text-[#D5AE57]"
            }`}
          >
            {category.name.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const category = categories.find(
              (item) => item.id === project.category_id
            );

            return (
              <article key={project.id} className="group">
                <div className="overflow-hidden rounded-xl border border-[#D5AE57]/20 bg-[#0C2037] transition duration-300 group-hover:border-[#D5AE57]">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#D5AE57]">
                  {category?.name || "CREATIVE PROJECT"}
                </p>

                <h3 className="mt-2 text-xl font-semibold text-white">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {project.description}
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#0C2037] px-6 py-16 text-center">
          <p className="text-lg font-semibold text-white">
            {projects.length === 0
              ? "Our creative work is coming soon."
              : "No projects in this category yet."}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Please check back soon to explore our latest projects.
          </p>
        </div>
      )}
    </div>
  );
}
