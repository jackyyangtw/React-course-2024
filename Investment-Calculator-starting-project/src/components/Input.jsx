export default function Input({ label, type = "number", ...props }) {
    return (
        <p>
            <label>{label}</label>
            <input type={type} {...props} required />
        </p>
    );
}
