 $(document).ready(function ($) {
        function getTimings() {
            fetch('https://extreme-ip-lookup.com/json/')
                .then(res => res.json())
                .then(response => {
                    $('#locPlace').val(`${response.city}, ${response.country}`);
                    fetch(`https://api.aladhan.com/v1/calendarByCity?city=${response.city}&country=${response.country}&method=0`)
                        .then(res => res.json())
                        .then(d => {
                            const { data } = d;
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
          $('#eMonth').text(data[0].date.gregorian.month.en);
          $('#aMonth').text(data[0].date.hijri.month.en);
            for(let d of data){
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