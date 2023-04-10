import Logo from './Ganesh.jpg'
import './cssfiles/Mainbody.css'
import Navbar1 from './Navbar1'
function Mainpagebody() {
  return (
    <div>
    <Navbar1 />
    <div class="row1">
      <div class="column1">
        <img className="img1" src={Logo} alt="Logo" />
      </div>
      <div className="column1">
        <p className="p2p">Accounting, and Billing System</p>
      </div>
    </div>
    </div>
  );
}

export default Mainpagebody;