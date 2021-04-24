// Init App
var myApp = new Framework7({
    // Enable Material theme
    material: true,
	init: false
});

var $$ = Dom7;

myApp.onPageInit('index', function () {
	$$('#adsmain').removeAttr('hidden');
	myApp.hideIndicator();			
	$$.ajax({
			url : "../apiv1_2.php?q=ads&v=0.1",
			success : function(data) {
				$$('.advert').html(data);
				
				if(window.innerHeight < 600 && window.innerHeight > 480){
					$$('.navigation').css('paddingBottom', '25px');
				} else if(window.innerHeight < 481){
					$$('.navigation').css('paddingBottom', '50px');
				}
				if($$(".advert a").length > 1){
					$$(function(){
					  $$('.advert > :gt(0)').hide();
					  setInterval(function(){$$('.advert > :first-child').fadeOut().next().fadeIn().end().appendTo('.advert');}, 5000);
					});	
				}
			}
		}); 
	
});

myApp.init();

myApp.onPageInit('favourites', function () {
	
	if(localStorage.reciters != ""){
		var response = JSON.parse(localStorage.reciters);
		
		response = $.grep(response,function(n){ return(n) });
		
		var list="";
		list = "<ul>";
		for(var i in response){
			if(response[i] != null){
				var result = response[i];
				list += '<li class="swipeout" id="li'+result.id+'"><a href="#" class="item-link swipeout-content custom-modal"><div class="item-inner">'+result.name+'</div></a><div class="swipeout-actions-left"><a href="#" class="swipeout-delete" data-confirm="Are you sure you want to remove this Reciter from Favourites?" data-confirm-title="Delete" data-close-on-cancel="true">Delete</a></div></li>';
			}
		}
		list += "</ul>";
		
	} else {
		list = '<div style="padding:15px; display:table-cell; vertical-align:middle; width:640px; height:450px" align="center"><div style="vertical-align:middle;border:1px solid #ccc; padding:5px; font-weight:bold; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e1e1e1), color-stop(50%,#d5d5d5), color-stop(51%,#d1d1d1), color-stop(100%,#f7f7f7)); background: -webkit-linear-gradient(top, #e1e1e1 0%,#d5d5d5 50%,#d1d1d1 51%,#f7f7f7 100%); -webkit-border-radius:5px;"><img width="64" src="resources/images/error.png" /><br>No Favourite Reciters Found!</div></div>'
	}
		$$("#favList").append(list);	
	var mySearchbar = myApp.searchbar('.searchbar', {
		searchList: '.list-block-search',
		searchIn: '.item-inner'
	});

	//$$('#adsmain').attr('hidden','hidden');
	
	var buttons = [
		  {
			 text: 'Choose some action',
			 label: true
		  },			   
		  {
			text: 'Nauha',
			onClick: function() {
			  loadUrl('Nauha');
			}
		  },
		  {
			text: 'Manqabat',
			onClick: function() {
			  loadUrl('Manqabat');
			}
		  },
		  {
			text: 'Marsiya',
			onClick: function() {
			  loadUrl('Marsiya');
			}
		  },
		  {
			text: 'Cancel',
			color: 'red'
		  }
		];
	
	$('.custom-modal').on('click', function () {
		var id = $(this).parent().attr('id').replace('li','');
		sessionStorage.favid = id;
	    myApp.actions(buttons);
	});
});

myApp.onPageAfterAnimation('favourites', function(){
	
	$('.swipeout').on('delete', function () {
	  var id = $(this).attr('id');
	  id = id.replace("li", "");
	  removeFavourite(id);
	});	
	
});

function loadUrl(type){
	mainView.router.loadPage('album.html?id='+sessionStorage.favid+'&type='+type);
	return false;
}




myApp.onPageInit('nauha', function (page) {
	myApp.showIndicator();	

	$$('#adsmain').attr('hidden','hidden')			

	$$.ajax({
			url : "http://alzulfiquar.com/lyrics/apiv1_2.php?q=nauhakhwan&type=Nauha&format=json",
			timeout : 30000,
			success : function(data) {
				
				var response = JSON.parse(data);
				var list="";
				for(var i in response){
					var result = response[i];
					list += '<li class="swipeout"><a href="album.html?type=Nauha&id='+result.id+'" class="item-link swipeout-content"><div class="item-inner">'+result.name+'</div></a><div class="swipeout-actions-left" id="swipe'+result.id+'"><a href="javascript:favourites(\''+result.name+'\', '+result.id+')" class="swipeout-close bg-green">Add to Favourite</a></div></li>';
				}
				$$("#nauhaList").append(list);
				myApp.hideIndicator();
			},
			error : function(x, t, m){
				//myApp.hideIndicator();
				if(t==="timeout"){
					myApp.alert("Your internet connection seems to be slow. Could not load results. Please try again", "Alert!");	
					mainView.router.back();
				}
			}
		});  
	
	var mySearchbar = myApp.searchbar('.searchbar', {
		searchList: '.list-block-search',
		searchIn: '.item-inner'
	});   
});


myApp.onPageInit('manqabat', function () {
	myApp.showIndicator();	

	$$('#adsmain').attr('hidden','hidden')			
								
	$$.ajax({
			url : "http://alzulfiquar.com/lyrics/apiv1_2.php?q=nauhakhwan&type=Manqabat&format=json",
			timeout : 30000,
			success : function(data) {
				
				var response = JSON.parse(data);
				var list="";
				for(var i in response){
					var result = response[i];
					list += '<li class="swipeout"><a href="album.html?type=Manqabat&id='+result.id+'" class="item-link swipeout-content"><div class="item-inner">'+result.name+'</div></a><div class="swipeout-actions-left" id="swipe'+result.id+'"><a href="javascript:favourites(\''+result.name+'\', '+result.id+')" class="swipeout-close bg-green">Add to Favourite</a></div></li>';
				}
				$$("#manqabatList").append(list);
				myApp.hideIndicator();
			},
			error : function(x, t, m){
				myApp.hideIndicator();
				if(t==="timeout"){
					myApp.alert("Your internet connection seems to be slow. Could not load results. Please try again", "Alert!");	
					mainView.router.back();
				}
			}
		});  
	
	var mySearchbar = myApp.searchbar('.searchbar', {
		searchList: '.list-block-search',
		searchIn: '.item-inner'
	});   
});


myApp.onPageInit('marsiya', function () {
	myApp.showIndicator();	

	$$('#adsmain').attr('hidden','hidden')			
	
	$$.ajax({
			url : "http://alzulfiquar.com/lyrics/apiv1_2.php?q=nauhakhwan&type=Marsiya&format=json",
			timeout : 30000,
			success : function(data) {
				
				var response = JSON.parse(data);
				var list="";
				for(var i in response){
					var result = response[i];
					list += '<li class="swipeout"><a href="album.html?type=Marsiya&id='+result.id+'" class="item-link swipeout-content"><div class="item-inner">'+result.name+'</div></a><div class="swipeout-actions-left" id="swipe'+result.id+'"><a href="javascript:favourites(\''+result.name+'\', '+result.id+')" class="swipeout-close bg-green">Add to Favourite</a></div></li>';
				}
				$$("#marsiyaList").append(list);
				myApp.hideIndicator();
			},
			error : function(x, t, m){
				myApp.hideIndicator();
				if(t==="timeout"){
					myApp.alert("Your internet connection seems to be slow. Could not load results. Please try again", "Alert!");	
					mainView.router.back();
				}
			}
		});  
	
	var mySearchbar = myApp.searchbar('.searchbar', {
		searchList: '.list-block-search',
		searchIn: '.item-inner'
	});   
});

myApp.onPageInit('album', function (page) {
	myApp.showIndicator();				
	
	var params = page.query;
	
	$$.ajax({
			url : "http://alzulfiquar.com/lyrics/apiv1_2.php?q=year&type="+params.type+"&id="+params.id+"&format=json",
			timeout : 30000,
			success : function(data) {
				
				var response = JSON.parse(data);
				if(!response.error){
					var list="<ul>";
					for(var i in response){
						var result = response[i];
						list += '<li><a href="list.html?type='+params.type+'&name='+result.name+'&id='+params.id+'&year='+result.year+'" class="item-link"><div class="item-inner">'+result.year+'<span class="badge">'+result.count+'</span></div></a></li>';
					}
					list += '</ul>';
				} else {
					list = '<div style="padding:15px; display:table-cell; vertical-align:middle; width:640px; height:450px" align="center"><div style="vertical-align:middle;border:1px solid #ccc; padding:5px; font-weight:bold; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e1e1e1), color-stop(50%,#d5d5d5), color-stop(51%,#d1d1d1), color-stop(100%,#f7f7f7)); background: -webkit-linear-gradient(top, #e1e1e1 0%,#d5d5d5 50%,#d1d1d1 51%,#f7f7f7 100%); -webkit-border-radius:5px;"><img width="64" src="resources/images/error.png" /><br>No Lyrics Found!</div></div>';
				}
				$$("#albumList").html(list);
				myApp.hideIndicator();
			},
			error : function(x, t, m){
				myApp.hideIndicator();
				if(t==="timeout"){
					myApp.alert("Your internet connection seems to be slow. Could not load results. Please try again", "Alert!");	
					mainView.router.back();
				}
			}
		});  
});

myApp.onPageInit('list', function (page) {
	myApp.showIndicator();
	
	var params = page.query;
	$$("#listTitle").text(params.name+' ('+params.year+')');
	$$.ajax({
			url : "http://alzulfiquar.com/lyrics/apiv1_2.php?q=list&type="+params.type+"&id="+params.id+"&year="+params.year+"&format=json",
			timeout : 60000,
			success : function(data) {
				
				var response = JSON.parse(data);
				var list="";
				for(var i in response){
					var result = response[i];
					list += '<li><a href="lyrics.html?title='+result.title+'&id='+result.id+'" class="item-link"><div class="item-inner">'+result.title+'</div></a></li>';
				}
				$$("#list").append(list);
				myApp.hideIndicator();
			},
			error : function(x, t, m){
				myApp.hideIndicator();
				if(t==="timeout"){
					myApp.alert("Your internet connection seems to be slow. Could not load results. Please try again", "Alert!");	
					mainView.router.back();
				}
			}
		});  
});

myApp.onPageInit('savedlist', function (page) {
	
		getLyricsNauhaList();
		getLyricsManqabatList();
		getLyricsMarsiyaList();
		showToast('SWIPE RIGHT ON THE LYRICS TITLE TO DELETE!');
		
		$('#tabs1').tabulous({
			effect: 'scale'
		});
});

myApp.onPageAfterAnimation('savedlist', function(){
	
	var mySearchbar = myApp.searchbar('.searchbar', {
			searchList: '.list-block-search',
			searchIn: '.item-inner'
		}); 
		
	
	$('.swipeout').on('delete', function () {
	  var id = $(this).attr('id');
	  id = id.replace("li", "");
	  deleteLyrics(id);
	});	
	
	
});


myApp.onPageInit('lyrics', function (page) {
	myApp.showIndicator();
	
	var params = page.query;
	$$("#lyricsTitle").text(params.title);
	$$.ajax({
			url : "http://alzulfiquar.com/lyrics/apiv1_2.php?q=lyric&id="+params.id,
			timeout : 30000,
			success : function(response) {
				var data = JSON.parse(response);
				$$("#lyrics-data").html(data.lyrics);
				$$("#lyrics-data").show();
				
				sessionStorage.type = data.type;
				sessionStorage.reciter = data.reciter;
				sessionStorage.year = data.year;
				sessionStorage.audio = data.audio;
				sessionStorage.video = data.video;
				
				if(data.audio != ''){
					$$('.dialogBox').on('click', function () {
						myApp.pickerModal('.picker-modal-demo');
					});
					
					var audio = $$("#sourceUrl");
					$$("#sourceUrl").attr('src',data.audio);
					document.getElementById("sourceUrl").load();
					$$('#audio').show();
					
				} else {
					$$('#audio').hide();
				}
				if(data.video != ''){
					$$('#video a').attr('href', data.video);
					$$('#video').show();
				} else {
					$$('#video a').attr('href', "");
					$$('#video').hide();	
				}
				
				myApp.hideIndicator();
			},
			error : function(x, t, m){
				myApp.hideIndicator();
				if(t==="timeout"){
					myApp.alert("Your internet connection seems to be slow. Could not load results. Please try again", "Alert!");	
					mainView.router.back();
				}
			}
		});

		//init download modal
		$('#downloadBtn').on('click', function () {
		  var modal = myApp.modal({
			title: 'Download',
			afterText:  '<div class="status" style="font-size:14px; text-align:right">Fetching file information...</div><div class="progressbar color-red"><span></span></div>',
			buttons: [
			  {
				text: 'Cancel',
				onClick: function () {
				  abortDownload();
				  myApp.closeModal();
				  $('.modal-overlay').removeClass('modal-overlay-visible');
				}
			  },
			]
		  });
		});
		
		
});

myApp.onPageInit('searchpage', function(page){

	$$('#adsmain').attr('hidden','hidden')
		
	$("#btnSearch").click(function(){
		value = $("#autocomplete-dropdown-ajax").val();
		mainView.router.loadPage('search.html?keyword='+value);
	});
	
	$(".chip").click(function(){
		value = $(this).children().text();
		mainView.router.loadPage('search.html?keyword='+value);
	});
	
});

myApp.onPageInit('search', function (page) {
	myApp.showIndicator();
	
	var params = page.query;
	
	if(params.keyword == ""){
		myapp.alert("Lyrics Title is required!!!");	
		mainView.router.back();
	}
	
	$$.ajax({
		url : "http://alzulfiquar.com/lyrics/apiv1_2.php?q=searchcount&term="+params.keyword,
		timeout : 60000,
		success : function(response) {
			$$("#searchTitle").text(response+" Lyrics Found!");
		},
		error : function(x, t, m){
			myApp.hideIndicator();
			if(t==="timeout"){
				myApp.alert("Your internet connection seems to be slow. Could not load results. Please try again", "Alert!");	
				mainView.router.back();
			}
		}
	});  
	
	$$.ajax({
		url : "http://alzulfiquar.com/lyrics/apiv1_2.php?q=search&format=json&term="+params.keyword,
		timeout : 30000,
		success : function(data) {
			var response = JSON.parse(data);
			if(!response.error){
				var list="<ul>";
				for(var i in response){
					var result = response[i];
					list += '<li><a href="lyrics.html?title='+result.title+'&id='+result.id+'" class="item-link"><div class="item-inner"><div class="item-title">'+result.title+'<br><em>'+result.name+' ('+result.year+') - '+result.type+'</em></div></div></a></li>';
				}
				list += '</ul>';					
				$$("#searchList").html(list);
			} else {
				$$("#searchList").html('<div style="padding:15px; display:table-cell; vertical-align:top; width:640px;" align="center"><div style="vertical-align:middle;border:1px solid #ccc; padding:5px; font-weight:bold; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e1e1e1), color-stop(50%,#d5d5d5), color-stop(51%,#d1d1d1), color-stop(100%,#f7f7f7)); background: -webkit-linear-gradient(top, #e1e1e1 0%,#d5d5d5 50%,#d1d1d1 51%,#f7f7f7 100%); -webkit-border-radius:5px;"><img width="64" src="resources/images/error.png" /><br>No Lyrics found for the term "'+params.keyword+'"!</div></div>');
				
				if(response.related_result != ""){
					var list="<ul>";
					list += '<li><div class="item-divider">Related Search Results</li>';
					var rr = response.related_result;
					for(var i in rr){
						var result = rr[i];
						list += '<li><a href="lyrics.html?title='+result.title+'&id='+result.id+'" class="item-link"><div class="item-inner"><div class="item-title">'+result.title+'<br><em>'+result.name+' ('+result.year+') - '+result.type+'</em></div></div></a></li>';
					}
					list += '</ul>';	
					$$("#searchList").append(list);
				}
				
			}
			myApp.hideIndicator();
		},
		error : function(x, t, m){
			myApp.hideIndicator();
			if(t==="timeout"){
				myApp.alert("Your internet connection seems to be slow. Could not load results. Please try again", "Alert!");	
				mainView.router.back();
			}
		}
	});  
	var mySearchbar = myApp.searchbar('.searchbar', {
		searchList: '.list-block-search',
		searchIn: '.item-title'
	}); 
	
});

myApp.onPageInit('savedlyrics', function (page) {
	var params = page.query;
	sessionStorage.lyricsId = params.id	
	getLyrics();
});


$$('.popover a').on('click', function () {
    myApp.closeModal('.popover');
});

$$('.picker-modal').on('close', function(){
	document.getElementById("sourceUrl").pause();										 
});



// Add main view
var mainView = myApp.addView('.view-main', {
});

function createTable(tx) {
	 //tx.executeSql('DROP TABLE IF EXISTS my_saved_lyrics');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS my_saved_lyrics_new (id integer primary key autoincrement, title char(100) not null, type char(10) not null, lyrics text not null, reciter varchar(150), year char(4), video varchar(100), audio varchar(300))');
	 tx.executeSql('SELECT title from my_saved_lyrics_new where type = ? and title = ?', [sessionStorage.type, $("#lyricsTitle").text()], lyricFound, errorFind);
}

function errorFind(err) {
	myApp.alert(err.message)	
}

function lyricFound(tx, results) {
	if(results != null && results.rows != null && results.rows.length > 0) {
		showToast('You already have this lyrics in your saved lyrics!');
	} else {
		tx.executeSql("INSERT INTO my_saved_lyrics_new('title','lyrics','type','reciter','year','audio','video') values(?,?,?,?,?,?,?)",[$("#lyricsTitle").text(), $("#lyrics-data").html(), sessionStorage.type, sessionStorage.reciter, sessionStorage.year, sessionStorage.audio, sessionStorage.video], successCT, errorCT);
	}
}


function errorCT(err) {
    myApp.alert("Error Saving Lyric: "+err.message);
}

function successCT() {
	   showToast('Lyrics Saved!');
}

function getNauhaData(tx) {
	tx.executeSql('SELECT id, title, reciter, year from my_saved_lyrics_new where type = "Nauha" order by title asc', [], successNauhaData, errorData);
}

function getManqabatData(tx) {
	tx.executeSql('SELECT id, title, reciter, year from my_saved_lyrics_new where type = "Manqabat" order by title asc', [], successManqabatData, errorData);
}

function getMarsiyaData(tx) {
	tx.executeSql('SELECT id, title, reciter, year from my_saved_lyrics_new where type = "Marsiya" order by title asc', [], successMarsiyaData, errorData);
}

function errorData(err) {
    //navigator.notification.alert("You do not have any Saved Lyrics!");
}

function successNauhaData(tx, results) {
	var data="";
    if (results != null && results.rows != null && results.rows.length > 0) {
       for(var i = 0;i < results.rows.length;i++)
       {
		   if(results.rows.item(i).title != ""){
			data += '<li class="swipeout" id="li'+results.rows.item(i).id+'"><a class="item-link swipeout-content" href="savedlyrics.html?id='+results.rows.item(i).id+'"><div class="item-inner"><div class="item-title">'+results.rows.item(i).title+'<br><em>'+results.rows.item(i).reciter+' ('+results.rows.item(i).year+')</em></div></div></a><div class="swipeout-actions-left"><a href="#" class="swipeout-delete" data-confirm="Are you sure want to delete this Lyrics?" data-confirm-title="Delete" data-close-on-cancel="true">Delete</a></div><li>';
		   }
	   }
	}
	   if(data == ""){
			data =  '<li><div class="item-inner" style="color:#C00;text-align:center;padding-top:12px;font: 15px segoe-regular;display:table; height:30px;width: 100%;">No Saved Lyrics Found!!!</div></li>';
	   }
	   $("#savedNauhaList").html(data);

}

function successManqabatData(tx, results) {
	var data="";
    if (results != null && results.rows != null && results.rows.length > 0) {
       for(var i = 0;i < results.rows.length;i++)
       {
		   if(results.rows.item(i).title != ""){
			data += '<li class="swipeout" id="li'+results.rows.item(i).id+'"><a class="item-link swipeout-content" href="savedlyrics.html?id='+results.rows.item(i).id+'"><div class="item-inner"><div class="item-title">'+results.rows.item(i).title+'<br><em>'+results.rows.item(i).reciter+' ('+results.rows.item(i).year+')</em></div></div></a><div class="swipeout-actions-left"><a href="#" class="swipeout-delete" data-confirm="Are you sure want to delete this Lyrics?" data-confirm-title="Delete" data-close-on-cancel="true">Delete</a></div><li>';
		   }
	   }
	}

	   if(data == ""){
			data =  '<li><div class="item-inner" style="color:#C00;text-align:center;padding-top:12px;font: 15px segoe-regular;display:table; height:30px;width: 100%;">No Saved Lyrics Found!!!</div></li>';
	   }
	   $("#savedManqabatList").html(data);
}

function successMarsiyaData(tx, results) {
	var data="";
    if (results != null && results.rows != null && results.rows.length > 0) {
       for(var i = 0;i < results.rows.length;i++)
       {
		   if(results.rows.item(i).title != ""){
			data += '<li class="swipeout" id="li'+results.rows.item(i).id+'"><a class="item-link swipeout-content" href="savedlyrics.html?id='+results.rows.item(i).id+'"><div class="item-inner"><div class="item-title">'+results.rows.item(i).title+'<br><em>'+results.rows.item(i).reciter+' ('+results.rows.item(i).year+')</em></div></div></a><div class="swipeout-actions-left"><a href="#" class="swipeout-delete" data-confirm="Are you sure want to delete this Lyrics?" data-confirm-title="Delete" data-close-on-cancel="true">Delete</a></div><li>';
		   }
	   }
	}
	   if(data == ""){
			data =  '<li><div class="item-inner" style="color:#C00;text-align:center;padding-top:12px;font: 15px segoe-regular;display:table; height:30px;width: 100%;">No Saved Lyrics Found!!!</div></li>';
	   }
	   $("#savedMarsiyaList").html(data);
}

function getLyric(tx) {
     tx.executeSql('SELECT title, lyrics, audio, video from my_saved_lyrics_new where id = '+sessionStorage.lyricsId, [], successLyric, errorLyric);
}

function successLyric(tx, results) {
	var htmlstring = "";
    if (results != null && results.rows != null && results.rows.length > 0) {
		htmlstring = results.rows.item(0).lyrics;
		$("#lyrics-title").text(results.rows.item(0).title);
		$("#lyricContainer").html(htmlstring).show();
		
		if(results.rows.item(0).audio != '' && results.rows.item(0).audio != null && typeof results.rows.item(0).audio != 'undefined'){
			$$('.dialogBoxSaved').on('click', function () {
				myApp.pickerModal('.picker-modal-demo');
			});
			
			var audio = $$("#sourceUrl");
			$$("#sourceUrl").attr('src',results.rows.item(0).audio);
			document.getElementById("sourceUrl").load();
			$('#audioSaved').show();
			
		} else {
			$('#audioSaved').hide();
		}
		
		if(results.rows.item(0).video != '' && results.rows.item(0).video != null && typeof results.rows.item(0).video != 'undefined'){
			$('#videoSaved a').attr('href', results.rows.item(0).video);
			$('#videoSaved').show();
		} else {
			$('#videoSaved a').attr('href', "");
			$('#videoSaved').hide();	
		}
	}
}

function errorLyric(err){
	myApp.alert(err, "Alert!");	
}

function saveLyrics(){
	var db = window.openDatabase("lyrics", "1.0", "Nauha Lyrics DB", 26214400);
	db.transaction(createTable);
}

function getLyricsNauhaList(){	
	var db = window.openDatabase("lyrics", "1.0", "Nauha Lyrics DB", 26214400);
	db.transaction(getNauhaData, errorData);
}

function getLyricsManqabatList(){	
	var db = window.openDatabase("lyrics", "1.0", "Nauha Lyrics DB", 26214400);
	db.transaction(getManqabatData, errorData);
}

function getLyricsMarsiyaList(){	
	var db = window.openDatabase("lyrics", "1.0", "Nauha Lyrics DB", 26214400);
	db.transaction(getMarsiyaData, errorData);
}

function getLyrics(){
	var db = window.openDatabase("lyrics", "1.0", "Nauha Lyrics DB", 26214400);
	db.transaction(getLyric, errorData);
}

function deleteLyrics(id){
	if(typeof id != "undefined"){
		sessionStorage.lid = id;
		var db = window.openDatabase("lyrics", "1.0", "Nauha Lyrics DB", 26214400);
		db.transaction(deleteSelected, errorDelete);
	} else{
		return false;	
	}		
}

function deleteSelected(tx){
	var lid = window.sessionStorage["lid"];
	tx.executeSql('delete from my_saved_lyrics_new where id IN ('+lid+')', [], successDelete, errorDelete);
}

function successDelete(){
	//showToast('Selected Lyrics was successfully deleted');
}

function errorDelete(err){
	showToast('Could not delete!');
}

function shareLyrics(){
	var OriginalString = $$("#lyrics-data").html();
	OriginalString = OriginalString.replace(/<br>/gi, '\n');
	OriginalString = OriginalString.replace(/<br\/>/gi, '\n');
	OriginalString = OriginalString.replace(/<br \/>/gi, '\n');
	OriginalString = OriginalString.replace(/<p>/gi, '\n\n');
	OriginalString = OriginalString.replace(/&nbsp;/gi, '');
	var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");
	window.plugins.socialsharing.share(StrippedString, $$("#lyricsTitle").text()+' :: via "Nauha Lyrics" App for Android')	
}

function shareSavedLyrics(){
	var OriginalString = $$("#lyricContainer").html();
	OriginalString = OriginalString.replace(/<br>/gi, '\n');
	OriginalString = OriginalString.replace(/<br\/>/gi, '\n');
	OriginalString = OriginalString.replace(/<br \/>/gi, '\n');
	OriginalString = OriginalString.replace(/<p>/gi, '\n\n');
	OriginalString = OriginalString.replace(/&nbsp;/gi, '');
	var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");
	window.plugins.socialsharing.share(StrippedString, $$("#lyrics-title").text()+' :: via "Nauha Lyrics" App for Android')	
}

function shareApp(){
	subject = 'NAUHA LYRICS for Android';
	text = 'I would like to share with you Nauha Lyrics App which provide users with almost every lyrics of regular Nauhakhwans, best for reciters. You can Download it from https://play.google.com/store/apps/details?id=com.nauha.lyrics';
	window.plugins.socialsharing.share(text, subject)	
}

var opened = 0;
function exitApp(){
	if (opened > 0) {
		return false;
	} else {
		myApp.confirm('Are you sure you want to exit?', 'Exit App', 
		  function () {
			navigator.app.exitApp();
		  },
		  function () {
			opened = 0;  
			return false;
		  }
		);
		opened = 1;
	}
}

function showPrompt(){
	myApp.prompt('Please enter the title of the lyrics you are searching for...', 'Search Lyrics', 
		function(value){
			if(value.trim() == ""){
				myApp.alert("Search keyword cannot be blank!", 'Alert!');
				return false;
			} else{
				mainView.router.loadPage('search.html?keyword='+value);
			}
		}, 
		function(){return false;});
}
		
function showToast(msg){
	window.plugins.toast.showLongBottom(msg);	
}


function favourites(name, id){
	
	var n = name;
	var i = id;
	
	if(typeof localStorage.reciters == "undefined" || localStorage.reciters == ""){
		var arr = {'id':i, 'name':n};
		localStorage.reciters = JSON.stringify(arr);
		$("#swipe"+i).find('a').removeClass('bg-green').addClass('bg-red').text('Added to Favourite');
		//showToast(name+" is added to your Favourites");
	} else {
		var obj = JSON.parse(localStorage.reciters);
		var z = 2;
		for(it in obj) { 
			if(obj[it] != null && obj[it].id == i){
				z = 1;
				break;
			}
		}
		if(z == 1){
			myApp.alert("This Reciter already exists in your favourite list","Alert!");
		} else {
			arr = $.makeArray(obj)
			arr.push({'id':i, 'name':n});			
			localStorage.reciters = JSON.stringify(arr);
			$("#swipe"+i).find('a').removeClass('bg-green').addClass('bg-red').text('Added to Favourite');
			//showToast(n+" is added to your Favourites");
		}
	}
}

function removeFavourite(id){
	
	var obj = JSON.parse(localStorage.reciters);
	for(it in obj) { 
		if(obj[it] != null && obj[it].id == id){
			n = obj[it].name;
			delete obj[it];
			showToast(n+" is removed from your Favourites");		
			break;
		}
	}
	
	arr = $.makeArray(obj);			
	localStorage.reciters = JSON.stringify(arr);
	return false;
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
	// Handle the back button
	if(mainView.activePage.name == 'index'){
		exitApp();
		e.preventDefault();
	} else {
		myApp.closeModal();
		mainView.router.back();
		return false;
	}

}

var fileTransfer;
function DownloadAudio(){
	var url = $("#sourceUrl").attr("src");
	
	var filename = url.split('/').pop();
	fileTransfer = new FileTransfer();
	var uri = encodeURI(url);
	
	fileTransfer.onprogress = function(progressEvent) {
		
		var progressbar = $('.progressbar');
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			
			var pl = ((progressEvent.loaded/1024)/1024);
			var pt = ((progressEvent.total/1024)/1024);
			$(".status").text((Math.round(pl * 100) / 100)+" MB / "+(Math.round(pt * 100) / 100)+" MB");
			myApp.setProgressbar(progressbar, perc);
		} else {
			$(".status").text('0 MB/ 0 MB');
		}
	};
	
	fileTransfer.download(
		uri,
		'sdcard/Download/'+filename,
		function(entry) {
			myApp.closeModal();
			$('.modal-overlay').removeClass('modal-overlay-visible');
			showToast("Download Complete");
		},
		function(error) {
			//alert("download error source " + error.source);
			//alert("download error target " + error.target);
			//alert("upload error code" + error.code);
			if(error.code == 4){
				showToast("Download cancelled");
			} else if(error.code == 2){
				myApp.alert(url);
			} else if(error.code == 1){
				showToast("File not found on server");
			} else {
				showToast("Couldn't complete download. please try again");
			}
		},
		true
	);
}

function abortDownload(){
	fileTransfer.abort();
}