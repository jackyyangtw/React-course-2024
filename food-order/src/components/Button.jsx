export default function Button({ children, textBtn = false, ...props }) {
    return (
        <button className={textBtn ? "text-button" : "button"} {...props}>
            {children}
        </button>
    );
}
