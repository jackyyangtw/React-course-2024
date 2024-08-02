export default function Input({ label, type, id, ...props }) {
    return (
        <div className="control">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} {...props} tabIndex="-1" />
        </div>
    );
}
