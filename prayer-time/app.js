$(document).ready(function ($) {
  $("#customLoc").submit(function(event) {
    //console.log(event);
    let loc = $("#locPlace").val();
    let locArray = loc.split(",");
    //console.log(locArray);
          fetch(`https://api.aladhan.com/v1/calendarByCity?city=${locArray[0]}&country=${locArray[1]}&method=0`)
                        .then(res => res.json())
                        .then(d => {
                            const { data } = d;
                            renderTimings(data);
                            //console.log(data);
                        })
                        .catch(err => console.log(err));
    
    event.preventDefault();
  });

  function getTimings() {
    fetch('https://extreme-ip-lookup.com/json/')
    .then(res => res.json())
    .then(response => {
      $('#locPlace').val(`${response.city}, ${response.country}`);
      fetch(`https://api.aladhan.com/v1/calendarByCity?city=${response.city}&country=${response.country}&method=0`)
      .then(res => res.json())
      .then(d => {
        const {
          data
        } = d;
        renderTimings(data);
        //console.log(data);
      })
      .catch(err => console.log(err));
    })
    .catch((data, status) => {
      console.log('Request failed', data, status);
    });
  }

  function renderTimings(data) {
    $('#time-table').html(`<tr>
                <th id="eMonth">Month</th>
                <th id="aMonth">Month</th>
                <th>Fajr</th>
                <th>Dhuhr</th>
                <th>Maghrib</th>
                <th>Sunrise</th>
                <th>Sunset</th>
            </tr>`);
    $('#eMonth').text(data[0].date.gregorian.month.en);
    $('#aMonth').text(data[0].date.hijri.month.en);
    for (let d of data) {
      $('#time-table').append(`
        <tr>
        <td>${d.date.gregorian.day}</td>
        <td>${d.date.hijri.day}</td>
        <td>${d.timings.Fajr.substring(0, 6)}</td>
        <td>${d.timings.Dhuhr.substring(0, 6)}</td>
        <td>${d.timings.Maghrib.substring(0, 6)}</td>
        <td>${d.timings.Sunrise.substring(0, 6)}</td>
        <td>${d.timings.Sunset.substring(0, 6)}</td>
        </tr>`)
      //console.log(d.timings.Fajr, count);
    }
  }

  getTimings();
});




// Export
var Export = new function () {
  this.pdf = function () {
    var tab = document.getElementById('time-table');
    fetch('https://extreme-ip-lookup.com/json/')
    .then(res => res.json())
    .then(response => {
      var style = "<style>";
      style = style + "table {width: 100%;font: 17px Nunito;}";
      style = style + "h1, h2 h3, p {font-size: 15px; font-family: Nunito;}";
      style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
      style = style + "padding: 2px 3px;text-align: center;}";
      //style = style + "";
      style = style + "* { -webkit-print-color-adjust: exact !important; color-adjust: exact !important;}"
      style = style + "</style>";

      var win = window.open('', '', 'height=700,width=700');
      win.document.write(style); //  add the style.
      win.document.write('<head><link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"></head>')
      win.document.write(`<body><center><b><h1>Prayer Time - ${response.city}, ${response.country}</b><h1><center>`);
      win.document.write("<center><p>Provided By Shia Channel<p></center>")
      win.document.write(tab.outerHTML);
      win.document.write("</body>");
      win.document.close();
      win.print();
    });
  }
}