import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import * as React from "react";
import { useSelector } from "react-redux";

let categories = [{
  
  "label": "clothes",
  "icon": "User",
  "_id": "638fe6372f4236e5a6677c67"

}]

export default function TransactionsList({
  data,
  fetchTransctions,
  setEditTransaction,
}) {


  function categoryName(id) {
    // console.log(id);
    // console.log(user);
    // const myCategory = user.categories.find((category) => category._id == id);
    const myCategory = categories.find((category) => category._id == id);

    // console.log(myCategory);
    return myCategory ? myCategory.label : "NA";
  }

  let user = useSelector((state) => state.auth.user);

  // ! temporary measures : fixed API delay problem from useSelect()
  if (typeof(user) != "undefined"){
    categories = user.categories
   console.log(categories);
 } else {
  window.location.reload();   
 }



  async function remove(_id) {
    const token = Cookies.get("token");
    if (!window.confirm("Are you sure")) return;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      fetchTransctions();
      window.alert("Deleted Successfully");
    }
  }

  function formatDate(date) {
    return dayjs(date).format("DD MMM, YYYY");
  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((month) =>
              month.transactions.map(
                (row) => (
                  console.log(row),
                  (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.amount}
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        {categoryName(row.category_id)}
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(row.date)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          component="label"
                          onClick={() => setEditTransaction(row)}
                        >
                          <EditSharpIcon />
                        </IconButton>

                        <IconButton
                          color="warning"
                          component="label"
                          onClick={() => remove(row._id)}
                        >
                          <DeleteSharpIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
