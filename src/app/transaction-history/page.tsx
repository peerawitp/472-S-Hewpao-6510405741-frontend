// app/transaction-history/page.tsx
"use client";

import { PaymentStatus, Transaction } from "@/interfaces/Transaction";
import { mockTransactions } from "@/mock-data/transaction";
import { formatCurrency } from "@/utils/formatters";
import { useState, useEffect } from "react";
import TransactionDetails from "../component/TransactionDetails";
import { useSession } from "next-auth/react";

export default function TransactionHistoryPage() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<PaymentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [activeGateway, setActiveGateway] = useState<string | "all">("all");

  // Get all available gateways in the system
  const availableGateways = Array.from(
    new Set(mockTransactions.map((tx) => tx.ThirdPartyGateway))
  );

  // Fetch transactions (mocked for now)
  useEffect(() => {
    // In a real app, fetch from API based on current user ID
    if (session?.user?.email) {
      // Filter transactions for current user only
      const userTransactions = mockTransactions.filter(
        (tx) => tx.User?.email === session.user.email
      );
      setTransactions(userTransactions);
      setFilteredTransactions(userTransactions);
    } else {
      // For demo/development, show all
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
    }
  }, [session]);

  // Filter transactions when filters change
  useEffect(() => {
    let result = transactions;

    // Filter by status
    if (activeFilter !== "all") {
      result = result.filter((tx) => tx.Status === activeFilter);
    }

    // Filter by gateway
    if (activeGateway !== "all") {
      result = result.filter((tx) => tx.ThirdPartyGateway === activeGateway);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.ID.toLowerCase().includes(query) ||
          (tx.description && tx.description.toLowerCase().includes(query)) ||
          (tx.ThirdPartyPaymentID && tx.ThirdPartyPaymentID.toLowerCase().includes(query))
      );
    }

    // Filter by date range
    if (dateRange.start) {
      const startDate = new Date(dateRange.start);
      result = result.filter(
        (tx) => new Date(tx.CreatedAt) >= startDate
      );
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // End of day
      result = result.filter(
        (tx) => new Date(tx.CreatedAt) <= endDate
      );
    }

    setFilteredTransactions(result);
  }, [transactions, activeFilter, activeGateway, searchQuery, dateRange]);

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedTransaction(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Transaction History</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Status Filter */}
          <div className="flex-none">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === "all"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("COMPLETED")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === "COMPLETED"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveFilter("PENDING")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === "PENDING"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveFilter("FAILED")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === "FAILED"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Failed
              </button>
            </div>
          </div>
          
          {/* Gateway Filter */}
          <div className="flex-none">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={activeGateway}
              onChange={(e) => setActiveGateway(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Methods</option>
              {availableGateways.map((gateway) => (
                <option key={gateway} value={gateway}>
                  {gateway}
                </option>
              ))}
            </select>
          </div>
          
          {/* Search */}
          <div className="flex-1 min-w-[220px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by ID or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.ID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(transaction.CreatedAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {transaction.ThirdPartyGateway}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="truncate max-w-xs">
                        {transaction.description || 
                          `Payment ${transaction.ThirdPartyPaymentID ? 
                            `(${transaction.ThirdPartyPaymentID})` : ""}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <span className="text-gray-900">
                        {formatCurrency(transaction.Amount, "en-US", transaction.Currency)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500">No transactions found.</p>
            <p className="text-sm text-gray-400 mt-1">
              Try changing your filters or make a payment.
            </p>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <TransactionDetails
            transaction={selectedTransaction}
            onClose={closeDetailsModal}
          />
        </div>
      )}
    </div>
  );
}