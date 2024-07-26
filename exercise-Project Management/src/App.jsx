import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProjects";
import { useState } from "react";
function App() {
    const [projects, setProjects] = useState([
        {
            title: "Project 1",
            tasks: [{ text: "Task 1", completed: false, id: "1" }],
            dueDate: new Date(),
            description: "Description of project 1",
            id: "1",
        },
    ]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [mode, setMode] = useState(""); // project、add-project、task、edit-task

    const handleAddProject = () => {
        setMode("add-project");
    };
    const handleOnAdd = (project) => {
        setProjects((prev) => [...prev, project]);
        setMode("");
    };
    const handleOnCancel = () => {
        setMode("");
    };
    const handleOnGoToProject = (projectId) => {
        setMode("project");
        const selectedProject = projects.find(
            (project) => project.id === projectId
        );
        setSelectedProject(selectedProject ? { ...selectedProject } : null);
    };
    return (
        <>
            <main className="h-screen my-8 flex gap-8">
                <ProjectsSidebar
                    onAddProject={handleAddProject}
                    onGoToProject={handleOnGoToProject}
                    projects={projects}
                />
                {mode === "" && <NoProjectSelected />}
                {mode === "add-project" && (
                    <NewProject
                        onAddProject={handleOnAdd}
                        onCancel={handleOnCancel}
                    />
                )}
                {mode === "project" && selectedProject && (
                    <SelectedProject
                        project={selectedProject}
                        tasks={selectedProject.tasks}
                    ></SelectedProject>
                )}
            </main>
        </>
    );
}

export default App;
