// Enable pusher logging - don't include this in production
// document.getElementById("tbody_turnos").innerHTML = "";
// document.getElementById("cards_container").innerHTML = "";

const CAJAS = 5;
Pusher.logToConsole = true;

var pusher = new Pusher("b70b1baa91c69051cb75", {
   cluster: "us2"
});

var channel = pusher.subscribe("myCanal");
channel.bind("myEvento", function (data) {
   const rows = JSON.parse(data.message);
   console.log("ya llego", rows);
   const tableHtml = `
            ${rows.map((r, index) => {
               if (index >= CAJAS) return;
               let bg_row = "";
               if (index == 0) bg_row = "red";

               return `
                  <tr style="background-color:${bg_row}">
                     <td>${r.CAJA}</td>
                     <td>${r.TURNO}</td>
                  </tr>
               `;
            })}`;

   const cardsHtml = `
            ${rows.map((r, index) => {
               if (index < CAJAS) return;
               return `
                  <div class="card">${r.TURNNO}</div>
               `;
            })}`;

   document.getElementById("tbody_turnos").innerHTML = tableHtml;
   document.getElementById("cards_container").innerHTML = cardsHtml;
});
