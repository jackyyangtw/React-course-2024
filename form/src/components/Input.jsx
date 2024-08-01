export default function Input({ id, label, error, ...props }) {
    return (
        <div className="control no-margin">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...props} />
            <div className="control-error">
                {error && <p className="form-error">{error}</p>}
            </div>
        </div>
    );
}
