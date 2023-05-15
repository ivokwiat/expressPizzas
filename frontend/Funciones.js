function CargarPizzas() {
    axios
      .get("http://localhost:3000/")
      .then((result) => {
        const pizza = result.data;
  
        pizzas.map((pizza, index) => {
          const { Nombre} = pizza;
  
          document.querySelector(
            "#listado"
          ).innerHTML += `<div class="card centerr columna rounded " style="width: 18rem;">
  
       
          <div class="card-body" >
            <h5 class="card-title">${Nombre}</h5>
           
            </div>
        </div>`;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }