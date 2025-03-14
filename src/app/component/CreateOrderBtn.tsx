import Link from "next/link"

function CreateOrder() {
    return (
        <Link
            href="/my-product/create-order"
            className="inline-block text-white bg-primary px-8 py-4 rounded-lg font-medium text-lg transition duration-200 hover:bg-dark-primary shadow-lg"
        >
            + Create Order
        </Link>
    )
}

export default CreateOrder