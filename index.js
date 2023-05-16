const express = require("express");
const app = express();
const PORT = 8080;
const uuid4 = require("uuid4");

let products = [];

app.use(express.json());

app.get("/productos", (req, res) => {
  res.send({ data: products, message: "todos los productos enviados" });
});

app.post("/createProduct", (req, res) => {
  let id = uuid4();
  //body de la peticion
  let pr = req.body;
  pr.id = id;
  products.push(pr);
  res.send({ data: pr, message: "Producto guardado correctamente" });
});

app.delete("/deleteProduct/:id", (req, res) => {
  let id = req.params.id;
  const arrayNew = products.filter((ele) => {
    return ele.id !== id;
  });
  products = arrayNew;
  res.send({ data: products, message: "Producto eliminado correctamente" });
});

app.put("/updateProduct/:id", (req, res) => {
  let id = req.params.id;
  let infoNew = req.body;
  let arrayNew = products.map((ele) => {
    if (ele.id == id) {
      return { ...infoNew, id };
    } else {
      return ele;
    }
   });
//   console.log(arrayNew);
  products = arrayNew;
  res.send({ data: products, message: "Producto actualizado" });
});

app.listen(PORT, () => {
  console.log("server run on ", PORT);
});
