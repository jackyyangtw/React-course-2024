export default function Tabs({ children, buttons, ButtonContainer = "menu" }) {
    return (
        <>
            {/* ButtonContainer 用於自訂輸出的 element tag，必須是大寫開頭 */}
            <ButtonContainer>{buttons}</ButtonContainer>
            {children}
        </>
    );
}
