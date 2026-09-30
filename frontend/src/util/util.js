
export const prepareTransactionLineChartData = (transactions = []) => {
  if (!transactions.length) return [];

  // Sort by date
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Group incomes by date
  const groupedData = sortedTransactions.reduce((acc, transaction) => {
    const date = transaction.date;

    if (!acc[date]) {
      acc[date] = {
        date,
        amount: 0,
        details: [],
      };
    }

    // Add amount to total of that day
    acc[date].amount += Number(transaction.amount);

    // Save income details for tooltip
    acc[date].details.push({
      name: transaction.name,
      category: transaction.categoryName,
      amount: Number(transaction.amount),
      icon: transaction.icon,
    });

    return acc;
  }, {});

  return Object.values(groupedData);
};

export const addThousandSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    //Convert number to string to handle decimals
    const numStr = num.toString();
    const parts = numStr.split('.');//split integer and fractiona parts

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    //regex for indian numbering system
    //it handles the first three digits, then every two digits
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if(otherNumbers !== ''){
        //Apply comma after two digits for the 'otherNumbers' part
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
        integerPart = formattedOtherNumbers + ',' + lastThree;

    }else{
        integerPart = lastThree;//No chnage if less than 4 digits
    }

    //Combine integer and fractional parts
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;



}


// export const prepareIncomeLineChartData = (transactions = []) => {
//   if (!transactions.length) return [];

//   // Sort by date
//   const sortedTransactions = [...transactions].sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );

//   // Group total income by date
//   const groupedData = sortedTransactions.reduce((acc, item) => {
//     const date = item.date;

//     if (!acc[date]) {
//       acc[date] = 0;
//     }

//     acc[date] += Number(item.amount);

//     return acc;
//   }, {});

//   // Convert object to array for Recharts
//   return Object.keys(groupedData).map((date) => ({
//     date,
//     amount: groupedData[date],
//   }));
// };