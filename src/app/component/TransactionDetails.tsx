// components/TransactionDetails.tsx
"use client";

import { Transaction } from "@/interfaces/Transaction";
import { formatCurrency } from "@/utils/formatters";
import Link from "next/link";

interface TransactionDetailsProps {
  transaction: Transaction;
  onClose?: () => void;
}

const TransactionDetails = ({ transaction, onClose }: TransactionDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Transaction Details
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Header with amount and status */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              {new Date(transaction.CreatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(transaction.Amount, "en-US", transaction.Currency)}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                transaction.Status === "COMPLETED"
                  ? "bg-green-100 text-green-800"
                  : transaction.Status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : transaction.Status === "FAILED"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {transaction.Status === "COMPLETED" 
                ? "Completed" 
                : transaction.Status === "PENDING" 
                ? "Pending" 
                : transaction.Status === "FAILED" 
                ? "Failed" 
                : "Cancelled"}
            </span>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            TRANSACTION DETAILS
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="text-sm font-medium text-gray-900">
                {transaction.ID}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(transaction.Amount, "en-US", transaction.Currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Gateway</span>
              <span className="text-sm font-medium text-gray-900">
                {transaction.ThirdPartyGateway}
              </span>
            </div>
            {transaction.ThirdPartyPaymentID && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment Reference</span>
                <span className="text-sm font-medium text-gray-900">
                  {transaction.ThirdPartyPaymentID}
                </span>
              </div>
            )}
            {transaction.description && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Description</span>
                <span className="text-sm font-medium text-gray-900 text-right max-w-[300px]">
                  {transaction.description}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Related Product */}
        {transaction.ProductRequest && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              RELATED PRODUCT
            </h4>
            <Link href={`/product/${transaction.ProductRequest.id}`}>
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gray-200 rounded-md mr-3">
                  {transaction.ProductRequest.image && (
                    <img
                      src={transaction.ProductRequest.image}
                      alt={transaction.ProductRequest.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900">
                    {transaction.ProductRequest.name}
                  </h5>
                  <p className="text-xs text-gray-500">
                    {formatCurrency(transaction.ProductRequest.price, "en-US", transaction.Currency)} x {transaction.ProductRequest.quantity}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* User Info */}
        {transaction.User && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              CUSTOMER INFORMATION
            </h4>
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="text-sm font-medium text-gray-900">
                {transaction.User.name || "Unnamed User"}
              </div>
              <div className="text-xs text-gray-500">
                {transaction.User.email}
              </div>
            </div>
          </div>
        )}
        
        {/* Timestamps */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Created: {new Date(transaction.CreatedAt).toLocaleString("en-US")}</span>
            <span>Last Updated: {new Date(transaction.UpdatedAt).toLocaleString("en-US")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;