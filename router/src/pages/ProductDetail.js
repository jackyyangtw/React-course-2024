import { useParams, Link } from "react-router-dom";
export default function ProductDetailPage() {
    const { productId } = useParams();

    return (
        <>
            <div>
                <h1>Product Detail</h1>
                <p>Product id : {productId}</p>
                <p>
                    <Link to=".." relative="path">
                        Back
                    </Link>
                </p>
            </div>
        </>
    );
}
