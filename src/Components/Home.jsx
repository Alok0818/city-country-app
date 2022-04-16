import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
export const HomePage = () => {
  let [data, setData] = useState([]);
  let navigate = useNavigate();
  function getCities() {
    axios.get(" http://localhost:8080/cities").then((res) => {
      console.log(res.data);
      setData([...res.data]);
    });
  }

  useEffect(() => {
    getCities();
  }, []);
  function handleCountries() {
    data.sort(function (a, b) {
      return a.country.localeCompare(b.country);
    });
    console.log(data);
    setData([...data]);
  }
  function handlePopulation(value) {
    if (value === 1) {
      data.sort(function (a, b) {
        return a.population - b.population;
      });
    } else {
      data.sort(function (a, b) {
        return b.population - a.population;
      });
    }
    setData([...data]);
  }
  function handleCities() {
    return navigate("/add-city");
  }
  function handleDelete(e) {
    let { id } = e.target;
    console.log(e);
  }
  return (
    <>
      <h1>List of cities </h1>
      <Button variant="contained" color="warning" onClick={handleCities}>
        ADD CITY
      </Button>

      <Stack spacing={2} direction="row">
        <h3>Filter By:</h3>
        <Button variant="outlined" color="success" onClick={handleCountries}>
          Country
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            handlePopulation(1);
          }}
        >
          Population asc
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            handlePopulation(-1);
          }}
        >
          Population desc
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Population</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.country}</TableCell>
                  <TableCell align="center">{item.city}</TableCell>
                  <TableCell align="center">{item.population}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      value={item.id}
                      onClick={(e) => {
                        handleDelete(e);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="center" color="red">
                    <Button
                      variant="contained"
                      color="error"
                      value={item.id}
                      onClick={(e) => {
                        handleDelete(e);
                      }}
                    >
                      Delete
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
