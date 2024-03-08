import Header from '../../components/Header';

//header menu options
const menus = [
  { name: "Home", url: "/merchant-home", id: 1 },
  { name: "Orders", url: "/orders", id: 2 },
  { name: "Reports", url: "/reports", id: 3 },
  { name: "Log Out", url: "/", id: 4 }
];

export default function Orders() {
  return (
    <>
      <Header data={menus} title="Bahay Kubo" />
      <div className='p-4'>
        <h5>Pending Orders</h5>

        <h5>Approved Orders</h5>

        <h5>Cancelled Orders</h5>
      </div>
    </>
  )
}