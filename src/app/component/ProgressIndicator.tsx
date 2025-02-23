export default function ProgressIndicator({ step }: { step: number }) {
  const steps = [
    { id: 1, label: "Product details" },
    { id: 2, label: "Delivery details" },
    { id: 3, label: "Summary" },
  ];

  return (
    <div className="flex justify-center items-center my-6">
      {steps.map((item, index) => (
        <div key={item.id} className="flex items-center">
          {/* Circle Indicator */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold ${
              step >= item.id
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-200 text-gray-600 border-gray-400"
            }`}
          >
            {item.id}
          </div>

          {/* Step Label */}
          <span
            className={`ml-2 font-medium ${
              step >= item.id ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {item.label}
          </span>

          {/* Line Between Steps */}
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step > item.id ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
