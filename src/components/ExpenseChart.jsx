import { VictoryPie, VictoryLabel } from "victory";
import { useGlobalState } from "../context/GlobalState";
function ExpenseChart() {
    const { transactions } = useGlobalState();

  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0);
  console.log(totalIncome)

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0)*-1
  console.log(totalExpenses)


  const totalExpensesPercentage = ((totalExpenses / totalIncome) * 100)
  const totalIncomePercentage = 100 - totalExpensesPercentage
  console.log(totalExpensesPercentage)
  console.log(totalIncomePercentage)

  return (
    <div>
      <VictoryPie
        colorScale={["#e74c3c","#2ecc71"]}
        data={[
          {  x:"Expenses", y: totalExpensesPercentage },
          {  x:"Income", y: totalIncomePercentage },
        ]}
        animate={{
            duration: 200
        }}
        labels={({datum}) => `${datum.y}%`}
        labelComponent={<VictoryLabel
            angle={45}
            style={{
                fill: "white",
            }}
        />}
      />
    </div>
  );
}

export default ExpenseChart;
