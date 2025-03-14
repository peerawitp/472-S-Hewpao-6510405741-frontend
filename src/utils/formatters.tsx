// utils/formatters.ts

/**
 * Format a number as currency
 * @param amount Number to format
 * @param locale Locale to use for formatting (defaults to en-US for English)
 * @param currency Currency code (defaults to USD for US Dollar)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  locale = "en-US",
  currency = "USD"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string in a human-readable format
 * @param dateString ISO date string
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string => {
  return new Date(dateString).toLocaleDateString("en-US", options);
};