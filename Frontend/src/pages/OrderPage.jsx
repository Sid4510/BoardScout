import React from 'react'
import Navbar from '../components/common/Navbar'
import OrderList from '../components/Order/OrderList'
import Footer from '../components/common/Footer'

function OrderPage() {
  return (
    <div>
      <Navbar />
      <OrderList />
      <Footer />
    </div>
  )
}

export default OrderPage;
