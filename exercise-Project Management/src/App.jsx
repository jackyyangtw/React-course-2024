import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProjects";
import { useState } from "react";
function App() {
    const [projectState, setProjects] = useState({
        selectedProjectId: null,
        projects: [
            {
                title: "Project 1",
                dueDate: new Date().toString(),
                description: "Description of project 1",
                id: "1",
            },
        ],
        tasks: [
            {
                text: "Task 1",
                projectId: "1",
                id: Math.random().toString(),
            },
        ],
    });
    const selectedProject = projectState.projects.find(
        (project) => project.id === projectState.selectedProjectId
    );
    const [mode, setMode] = useState(""); // "project"、"add-project"、""

    const goToAddProjectPage = () => {
        setMode("add-project");
    };
    const handleOnAddProject = (project) => {
        setProjects((prev) => ({
            ...prev,
            projects: [...prev.projects, project],
        }));
        setMode("");
    };
    const handleOnDeleteProject = (projectId) => {
        setProjects((prev) => ({
            ...prev,
            projects: prev.projects.filter(
                (project) => project.id !== projectId
            ),
        }));
        setMode("");
    };
    const handleOnCancel = () => {
        setMode("");
    };

    const handleOnGoToProject = (projectId) => {
        setMode("project");
        setProjects((prev) => ({ ...prev, selectedProjectId: projectId }));
    };
    const handleOnAddTask = (task) => {
        setProjects((prev) => ({
            ...prev,
            tasks: [...prev.tasks, task],
        }));
    };
    const handleOnDeleteTask = (taskId) => {
        setProjects((prev) => ({
            ...prev,
            tasks: prev.tasks.filter((task) => task.id !== taskId),
        }));
    };
    return (
        <>
            <main className="h-screen my-8 flex gap-8">
                <ProjectsSidebar
                    onGoToAddProjectPage={goToAddProjectPage}
                    onGoToProject={handleOnGoToProject}
                    projects={projectState.projects}
                />
                {mode === "" && (
                    <NoProjectSelected onStartAddProject={goToAddProjectPage} />
                )}
                {mode === "add-project" && (
                    <NewProject
                        onAddProject={handleOnAddProject}
                        onCancel={handleOnCancel}
                    />
                )}
                {mode === "project" && selectedProject && (
                    <SelectedProject
                        project={selectedProject}
                        tasks={projectState.tasks}
                        onAddTask={handleOnAddTask}
                        onDeleteProject={handleOnDeleteProject}
                        onDeleteTask={handleOnDeleteTask}
                    ></SelectedProject>
                )}
            </main>
        </>
    );
}

export default App;
