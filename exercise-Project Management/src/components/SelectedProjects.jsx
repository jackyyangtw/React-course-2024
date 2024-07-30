import Tasks from "./Tasks.jsx";

export default function SelectedProject({
    project,
    tasks,
    onAddTask,
    onDeleteProject,
    onDeleteTask,
}) {
    const selectedTasks = tasks.filter((task) => task.projectId === project.id);
    return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>Due Date: {project.dueDate}</p>
            <button onClick={() => onDeleteProject(project.id)}>Delete</button>
            <Tasks
                tasks={selectedTasks}
                onAddTask={onAddTask}
                project={project}
                onDeleteTask={onDeleteTask}
            ></Tasks>
        </div>
    );
}
