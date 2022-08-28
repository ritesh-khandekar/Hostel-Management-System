import TableOptions from "./TableOptions";
import Table from "./Table";
import NavbarLight from "../navbar/NavbarAdminLight";

function Admin() {
    return <>
        <NavbarLight />
        <TableOptions total="4" pending="2" solved="2" />
        <Table />
    </>;
}
export default Admin;