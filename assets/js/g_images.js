// Gallery Images
$(document).ready(function ($) {
  var data = [{
    "id": "1",
    "title": "Majalis Ayyame Fatimiya",
    "img": "assets/images/g_images/g_1.jpg",
  }, {
    "id": "2",
    "title": "Majalis Ayyame Fatimiya",
    "img": "assets/images/g_images/g_2.jpg",
  }, {
    "id": "3",
    "title": "Majalis Ayyame Fatimiya",
    "img": "assets/images/g_images/g_3.jpg",
  }, {
    "id": "4",
    "title": "Majalis Ayyame Fatimiya",
    "img": "assets/images/g_images/g_4.jpg",
  }, {
    "id": "5",
    "title": "Majalis Ayyame Fatimiya",
    "img": "assets/images/g_images/g_5.jpg",
  }, {
    "id": "6",
    "title": "Majalis Ayyame Fatimiya",
    "img": "assets/images/g_images/g_6.jpg",
  }, {
    "id": "7",
    "title": "Juloos Imam Husain (as)",
    "img": "assets/images/g_images/g_7.jpg",
  }, {
    "id": "8",
    "title": "Juloos Imam Husain (as)",
    "img": "assets/images/g_images/g_8.jpg",
  }, {
    "id": "9",
    "title": "Juloos Imam Husain (as)",
    "img": "assets/images/g_images/g_9.jpg",
  }, {
    "id": "10",
    "title": "Juloos Imam Husain (as)",
    "img": "assets/images/g_images/g_10.jpg",
  }, {
    "id": "11",
    "title": "Juloos Imam Husain (as)",
    "img": "assets/images/g_images/g_11.jpg",
  }, {
    "id": "12",
    "title": "Juloos Imam Husain (as)",
    "img": "assets/images/g_images/g_12.jpg",
  }, {
    "id": "13",
    "title": "Juloos Imam Husain (as)",
    "img": "assets/images/g_images/g_13.jpg",
  }, {
    "id": "14",
    "title": "Juloos Imam Husain (as)",
    "img": "assets/images/g_images/g_14.jpg",
  }, {
    "id": "15",
    "title": "Dua e Nudbah",
    "img": "assets/images/g_images/g_15.jpg",
  }, {
    "id": "16",
    "title": "Dua e Nudbah",
    "img": "assets/images/g_images/g_16.jpg",
  }, {
    "id": "17",
    "title": "Peshkhwani Ayyame Fatimiya",
    "img": "assets/images/g_images/g_17.jpg",
  }, {
    "id": "18",
    "title": "Peshkhwani Ayyame Fatimiya",
    "img": "assets/images/g_images/g_18.jpg",
  }, {
    "id": "19",
    "title": "Peshkhwani Ayyame Fatimiya",
    "img": "assets/images/g_images/g_19.jpg",
  }, {
    "id": "20",
    "title": "Matam Ayyame Fatimiya",
    "img": "assets/images/g_images/g_20.jpg",
  }, {
    "id": "21",
    "title": "Majalis Ayyame Fatimiya",
    "img": "assets/images/g_images/g_21.jpg",
  }, {
    "id": "22",
    "title": "Juloos Imam Sajjad (as)",
    "img": "assets/images/g_images/g_22.jpg",
  }, {
    "id": "23",
    "title": "Juloos Imam Sajjad (as)",
    "img": "assets/images/g_images/g_23.jpg",
  }, {
    "id": "24",
    "title": "Juloos Imam Sajjad (as)",
    "img": "assets/images/g_images/g_24.jpg",
  }, {
    "id": "25",
    "title": "Juloos Imam Sajjad (as)",
    "img": "assets/images/g_images/g_25.jpg",
  }];

  function renderGallery(obj) {

    var html = `
    <div class="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
    <div class="service-single-item">
    <div class="service-single-img">
    <img loading="lazy" src="${obj.img}" alt="">
    </div>
    <div class="service-text">
    <h2>${obj.title}</h2>
    </div>
    </div>
    </div>
    `
    $('#gallery_container').append(html);
  }

  $.each(data, function(idx, obj) {
    renderGallery(obj);
  });
});

//Videos
$(document).ready(function ($) {
  var data = [{
    "id": "1",
    "title": "Khooni Pursa | MSRK | 24 Muharram 1442 | Golibar Sabeel",
    "link": "I58CxXMuyro",
  }, {
    "id": "2",
    "title": "MSRK PURSEDAARI 24th Muharram 1442 A.H 2020 Golibar Sabeel santacruz",
    "link": "mISfMGILJxc",
  }, {
    "id": "3",
    "title": "PURSEDAARI 24TH MUHARRAM 2020",
    "link": "a_H96tP1HAc",
  }, {
    "id": "4",
    "title": "Qamazani 9th Muharram 1442 AH",
    "link": "t-VMJ_WKiXM",
  }, {
    "id": "5",
    "title": "Qamazani Muharram 2020 part1",
    "link": "pvURcfvCyjQ",
  }, {
    "id": "6",
    "title": "Parcham Khushaayi 2020",
    "link": "IbHf39juMXc",
  }, {
    "id": "7",
    "title": "Dammam 9th Muharram 2020 Golibar Santa Cruz",
    "link": "oIzsnIT3O7A",
  }, {
    "id": "8",
    "title": "Juloos-e-Sayyad-e-Sajjad | Golibar | 1441 Hijri 2019",
    "link": "DVrrU2FbQs0",
  }, {
    "id": "9",
    "title": "GOLIBAR JULOOS 08/10/2018",
    "link": "T0XAUXzUcGE",
  }, {
    "id": "10",
    "title": "29th Muharram Juloos 2019 | Golibar Santacruz",
    "link": "evGMVZQYQjI",
  }, {
    "id": "11",
    "title": "Anjuman e Rasool e Khuda, Juloos Bimaar e Karbala - Golibar Santacruz",
    "link": "TUwPx9ITikU",
  }, {
    "id": "12",
    "title": "Anjuman e Rasool e Khuda | Golibar, Khar | Mumbai",
    "link": "d6UwhezESGM",
  }, {
    "id": "13",
    "title": "ANJUMAN-E-PANJETANI VIKHROLI SHABBEDARI MATAM ZANI GOLIBAR",
    "link": "O_9pEHzs3y8",
  }, {
    "id": "14",
    "title": "ANJUMAN E GHAMKHAWRAN E KARBALA | GOLIBAR 19TH NOVEMBER 2017 1439 HIJRI",
    "link": "Jne23-ii-m8",
  }, {
    "id": "15",
    "title": "|| Hay Sajjad ne gum ||1442 HIJRI || MSRK Golibar || 25 muharram ||",
    "link": "9AKTDD3ukcs",
  }, {
    "id": "16",
    "title": "25 MOHARRAM Golibar || 1442 HIJRI || Rone ke liye kafi hai Sajjad tera naam || PART -1",
    "link": "AOMDpSiW6Oc",
  }];

  function renderVideos(obj) {

    var html = `
    <div class="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
    <div class="service-single-item">
    <div class="service-single-img">
    <iframe width="100%" height="350" loading="lazy" src="https://youtube.com/embed/${obj.link}" allowfullscreen frameBorder="0"></iframe>
    </div>
    <div class="service-text">
    <h2>${obj.title}</h2>
    </div>
    </div>
    </div>
    `
    $('#video_container').append(html);
  }

  $.each(data, function(idx, obj) {
    renderVideos(obj);
  });
});

// Youtube Thumbnails
$(document).ready(function ($) {
  
  function renderYTgallery(obj) {

    var html = `
    <div class="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
    <div class="service-single-item">
    <div class="service-single-img">
    <img loading="lazy" src="${obj.snippet.thumbnails.high.url}" alt="">
    </div>
    <div class="service-text">
    <h2><a href="videos.html">${obj.snippet.title}</a></h2>
    </div>
    </div>
    </div>
    `
    $('#YTgallery_container').append(html);
  }
  
  fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyC3wVhwr_r5xAFA5Fw1IxYtmKs9C19SYiE&channelId=UCaWupZMa9uYmN-pfJOgaZug&part=snippet,id&order=date&maxResults=20')
  .then(response => response.json())
  .then(data => {
    $.each(data.items, function(idx, obj) {
      renderYTgallery(obj);
      //console.log(obj);
    });
  })
  .catch(err => console.log(err));
});


// Youtube Videos
$(document).ready(function ($) {
  
  function renderYTVideos(obj) {

    var html = `
    <div class="col-lg-4 col-md-4 col-sm-6 custom-grid col-12">
    <div class="service-single-item">
    <div class="service-single-img">
    <iframe width="100%" height="350" loading="lazy" src="https://youtube.com/embed/${obj.id.videoId}" allowfullscreen frameBorder="0"></iframe>
    </div>
    <div class="service-text">
    <h2>${obj.snippet.title}</h2>
    </div>
    </div>
    </div>
    `
    $('#YTvideo_container').append(html);
  }
  
  fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyC3wVhwr_r5xAFA5Fw1IxYtmKs9C19SYiE&channelId=UCaWupZMa9uYmN-pfJOgaZug&part=snippet,id&order=date&maxResults=20')
  .then(response => response.json())
  .then(data => {
    $.each(data.items, function(idx, obj) {
      renderYTVideos(obj);
      //console.log(obj)
    });
  })
  .catch(err => console.log(err));
});
