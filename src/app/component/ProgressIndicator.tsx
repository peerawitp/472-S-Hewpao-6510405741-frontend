"use client";

export default function ProgressIndicator({
  step,
  steps, // Accept steps as a prop
}: {
  step: number;
  steps: string[]; // Array of strings for step labels
}) {
  return (
    <div className="flex justify-center items-center my-6">
      {steps.map((label, index) => {
        const stepId = index + 1; // The step ID is 1-based, so we use index + 1
        return (
          <div key={stepId} className="flex items-center">
            {/* Circle Indicator */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold ${
                step >= stepId
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-200 text-gray-600 border-gray-400"
              }`}
            >
              {stepId}
            </div>

            {/* Step Label */}
            <span
              className={`ml-2 font-medium ${
                step >= stepId ? "text-dark-primary" : "text-gray-500"
              }`}
            >
              {label}
            </span>

            {/* Line Between Steps */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  step > stepId ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
