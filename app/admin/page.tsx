
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  addProject,
  toggleProjectPublication,
  deleteProject,
} from "./actions";

export default async function AdminDashboard() {
  await connection();

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/admin/login");

  const { data: isAdmin, error: adminError } =
    await supabase.rpc("is_portfolio_admin");

  if (adminError || !isAdmin) redirect("/admin/login");

  const [{ data: categories, error: categoriesError }, { data: projects, error: projectsError }] =
    await Promise.all([
      supabase
        .from("portfolio_categories")
        .select("id, name, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("portfolio_projects")
        .select("id, title, description, image_url, published, category_id, created_at")
        .order("created_at", { ascending: false }),
    ]);

  return (
    <main className="min-h-screen bg-[#08152d] px-5 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">

        <header className="mb-10 border-b border-[#c9a45c]/30 pb-8">
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-[#d6b56f]">
            IMPERIUM MEDIA HUB
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-gray-300">
            Manage your portfolio, categories and creative projects.
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Signed in as: {user.email}
          </p>
        </header>

        {/* CATEGORY MANAGEMENT */}

        <section className="mb-10 rounded-2xl border border-[#c9a45c]/30 bg-[#10213d] p-6">
          <h2 className="mb-2 text-2xl font-bold text-[#d6b56f]">
            Portfolio Categories
          </h2>

          <p className="mb-6 text-sm text-gray-300">
            Create and organize your portfolio categories.
          </p>

          <form action={addCategory} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="name"
              required
              maxLength={80}
              placeholder="Enter category name"
              className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-[#08152d] px-4 py-3 text-white"
            />

            <button className="rounded-lg bg-[#c9a45c] px-6 py-3 font-bold text-[#08152d]">
              Add Category
            </button>
          </form>

          {categoriesError && (
            <p className="mt-5 text-red-300">
              {categoriesError.message}
            </p>
          )}

          <div className="mt-6 space-y-4">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="rounded-xl border border-white/10 bg-[#08152d] p-4"
              >
                <form action={updateCategory} className="flex flex-col gap-3 sm:flex-row">
                  <input type="hidden" name="id" value={category.id} />

                  <input
                    name="name"
                    required
                    maxLength={80}
                    defaultValue={category.name}
                    className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-[#10213d] px-4 py-3 text-white"
                  />

                  <button className="rounded-lg border border-[#c9a45c] px-5 py-3 text-[#d6b56f]">
                    Save Changes
                  </button>
                </form>

                <form action={deleteCategory} className="mt-3">
                  <input type="hidden" name="id" value={category.id} />
                  <button className="text-sm text-red-400">
                    Delete Category
                  </button>
                </form>
              </div>
            ))}

            {!categories?.length && (
              <p className="text-sm text-gray-400">
                No categories created yet.
              </p>
            )}
          </div>
        </section>

        {/* ADD PROJECT */}

        <section className="mb-10 rounded-2xl border border-[#c9a45c]/30 bg-[#10213d] p-6">
          <h2 className="mb-2 text-2xl font-bold text-[#d6b56f]">
            Add Portfolio Project
          </h2>

          <p className="mb-6 text-sm text-gray-300">
            Upload a project image and provide its details.
          </p>

<form action={addProject} className="space-y-5">            <div>
              <label className="mb-2 block text-sm font-medium">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                required
                maxLength={150}
                placeholder="e.g. Luxury Brand Identity Design"
                className="w-full rounded-lg border border-gray-600 bg-[#08152d] px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Project Description
              </label>

              <textarea
                name="description"
                required
                maxLength={3000}
                rows={4}
                placeholder="Describe the project..."
                className="w-full rounded-lg border border-gray-600 bg-[#08152d] px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Project Category
              </label>

              <select
                name="category_id"
                defaultValue=""
                className="w-full rounded-lg border border-gray-600 bg-[#08152d] px-4 py-3 text-white"
              >
                <option value="">Uncategorized</option>

                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Project Image
              </label>

              <input
                type="file"
                name="image"
                required
                accept="image/jpeg,image/png,image/webp"
                className="w-full rounded-lg border border-gray-600 bg-[#08152d] p-3 text-sm text-gray-300"
              />

              <p className="mt-2 text-xs text-gray-400">
                JPG, PNG or WebP. Maximum file size: 5 MB.
              </p>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#c9a45c] px-8 py-3 font-bold text-[#08152d] hover:bg-[#e0c17e]"
            >
              Upload Project
            </button>
          </form>
        </section>

        {/* PROJECT LIST */}

        <section className="rounded-2xl border border-[#c9a45c]/30 bg-[#10213d] p-6">
          <h2 className="mb-6 text-2xl font-bold text-[#d6b56f]">
            Manage Portfolio Projects
          </h2>

          {projectsError && (
            <p className="text-red-300">
              {projectsError.message}
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#08152d]"
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-[#d6b56f]">
                    {project.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-gray-300">
                    {project.description}
                  </p>

                  <p className="mt-4 text-xs text-gray-400">
                    {project.published ? "Published" : "Unpublished"}
                  </p>

                  <form action={toggleProjectPublication} className="mt-4">
                    <input type="hidden" name="id" value={project.id} />
                    <input
                      type="hidden"
                      name="published"
                      value={String(!project.published)}
                    />

                    <button className="w-full rounded-lg border border-[#c9a45c] px-4 py-2 text-sm text-[#d6b56f]">
                      {project.published ? "Unpublish Project" : "Publish Project"}
                    </button>
                  </form>

                  <form action={deleteProject} className="mt-2">
                    <input type="hidden" name="id" value={project.id} />

                    <button className="w-full rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-400">
                      Delete Project
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>

          {!projectsError && !projects?.length && (
            <p className="text-sm text-gray-400">
              No projects uploaded yet. Add your first project above.
            </p>
          )}
        </section>

      </div>
    </main>
  );
}
