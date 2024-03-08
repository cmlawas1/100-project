import Header from '../../components/Header'

//header menu options
const menus = [
  { name: "Home", url: "/merchant-home", id: 1 },
  { name: "Orders", url: "/orders", id: 2 },
  { name: "Reports", url: "/reports", id: 3},
  { name: "Log Out", url: "/", id: 4}
];

export default function Reports(){
  return(
    <>
      <Header data={menus} title="Bahay Kubo"/>
      <h2>Reports</h2>
    
    </>
  )
}