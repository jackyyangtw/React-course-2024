import Button from "./Button";
export default function ProjectsSidebar({
    onGoToAddProjectPage,
    projects,
    onGoToProject,
}) {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
                Your Projects
            </h2>
            <div>
                <Button onClick={onGoToAddProjectPage}>+ Add Project</Button>
            </div>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className="mt-4">
                        <button onClick={() => onGoToProject(project.id)}>
                            <h3>{project.title}</h3>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
