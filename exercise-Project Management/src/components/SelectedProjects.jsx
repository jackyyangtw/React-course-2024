import Tasks from "./Tasks.jsx";

export default function SelectedProject({ project, tasks }) {
    return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>Due Date: {project.dueDate.toString()}</p>
            <Tasks tasks={tasks}></Tasks>
        </div>
    );
}
