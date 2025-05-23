import React from 'react'
import CustomersStatisticsOne from './child/CustomersStatisticsOne'
import DistributionMapsOne from './child/DistributionMapsOne'
import RecentOrdersOne from './child/RecentOrdersOne'
import RecentOrdersTwo from './child/RecentOrdersTwo'
import RevenueReportOne from './child/RevenueReportOne'
import StockReportOne from './child/StockReportOne'
import TopCustomersOne from './child/TopCustomersOne'
import TopSellingProductOne from './child/TopSellingProductOne'
import TransactionsOne from './child/TransactionsOne'

const DashBoardLayerThree = () => {

  return (
    <section className="row gy-4">
      {/* RevenueReportOne */}
      <RevenueReportOne />

      {/* CustomersStatisticsOne */}
      <CustomersStatisticsOne />

      {/* RecentOrdersOne */}
      <RecentOrdersOne />

      {/* TransactionsOne */}
      <TransactionsOne />

      {/* RecentOrdersTwo */}
      <RecentOrdersTwo />

      {/* DistributionMapsOne */}
      <DistributionMapsOne />

      {/* TopCustomersOne */}
      <TopCustomersOne />


      {/* TopSellingProductOne */}
      <TopSellingProductOne />


      {/* StockReportOne */}
      <StockReportOne />

    </section>


  )
}

export default DashBoardLayerThree