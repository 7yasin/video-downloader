function youtubeBilgisi() {
   
  
    var video = document.getElementById("inputbox").value;
   var videoID = video.substr(video.length - 11);
 
 
   //https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=mWRsgZuwf_8&key=AIzaSyBcidrvuezqIZl1i6IVrL-W7VmNLfMaiT4
   fetch(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoID}&key=AIzaSyBcidrvuezqIZl1i6IVrL-W7VmNLfMaiT4`).then((resp) => resp.json())
.then(function(data) {

if(!data.items[0]) return

var baslık = data.items[0].snippet.title;

$('.urlkisim').html(`
<h2>VİDEO TO DOWNLOAD:</h2>
<INPUT type="text" name="link" id="inputbox" class="form-control link" VALUE="${baslık+" - "+data.items[0].id}" placeholder="${baslık}" disabled>

`);


})


}

function youtubeAra() {

      const apiKey = "" // WRITE HERE YOUR YOUTUBE V3 API KEY
      var aranacak = document.getElementById("ara").value;
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${aranacak}&type=video&key=`+apiKey).then((resp) => resp.json())
.then(function(data) {
  
let video = data.items[0]
$('.urlkisim').html(`
<h2>VIDEO TO DOWNLOAD:</h2>
<INPUT type="text" name="link" id="inputbox" class="form-control link" VALUE="${video.snippet.title+" - "+video.id.videoId}" placeholder="${video.snippet.title}" disabled>

`);

  
})
}

function downloadVideo(link,fromate) {
    var isValid = $("#donusturmeFormu").valid();
if ($("#donusturmeFormu").valid()) {
let verilenSite = $("#site").val()

if(verilenSite == 1) link = "https://www.youtube.com/watch?v="+link.substr(link.length - 11);


//$('.download-video').html('<iframe style="width:100%;height:60px;border:0;overflow:hidden;" scrolling="no" src="https://loader.to/api/button/?url='+link+'&f='+fromate+'"></iframe>');  

}
  }

function sayfaDegistir() {
let verilenSite = $("#site").val()

if(verilenSite == 0) return;

if(verilenSite == 1) {

$('.urlkisim').html(`
<h2>VIDEO TO DOWNLOAD</h2>

<INPUT type="text" name="link" id="inputbox" class="form-control link" VALUE="" placeholder="Video URL" oninput="youtubeBilgisi()">
<br>
<h2>OR</h2>
<INPUT type="text" name="ara" id="ara" class="form-control link" VALUE="" placeholder="Search video on YouTube" oninput="youtubeBilgisi()">
<br> 
<INPUT type="button" class="button default" NAME="button" Value="Search Video" onclick="youtubeAra()">

`);

} else {


let seçilenSite;
if(verilenSite == 2) seçilenSite = "TWITTER VIDEO TO DOWNLOAD"
if(verilenSite == 3) seçilenSite = "FACEBOOK VIDEO TO DOWNLOAD"
if(verilenSite == 4) seçilenSite = "TIKTOK VIDEO TO DOWNLOAD"
if(verilenSite == 5) seçilenSite = "TWITCH VIDEO TO DOWNLOAD"

$('.urlkisim').html(`
<h2>${seçilenSite}</h2>

<INPUT type="text" name="link" id="inputbox" class="form-control link" VALUE="" placeholder="Video URL'si" oninput="youtubeBilgisi()">
<br>



`);



}

}

function mode() {
 var element = document.body;
 element.classList.toggle("dark-mode");

}

$("#videoindirbutton").click(function(){
    $( "#inputbox" ).submit();

}) 



$.validator.addMethod('notEqualToString', function (value, element, param) {
    if (value == param) {
        return false;
    }
    else {
        return true;
    }
}, "Select the format in which the video will be converted; This field cannot be left blank!");

$.validator.addMethod('videoCheck', function (value, element, param) {
let verilenSite =  $("#site").val()
let çıkan = value


if(verilenSite == 1 && !çıkan.includes("youtube")) return false;
if(verilenSite == 1 && çıkan.includes("youtube")) return true;

if(verilenSite == 2 && !çıkan.includes("twitter")) return false;
if(verilenSite == 2 && çıkan.includes("twitter")) return true;

if(verilenSite == 3 && !çıkan.includes("facebook")) return false;
if(verilenSite == 3 && çıkan.includes("facebook")) return true;

if(verilenSite == 4 && !çıkan.includes("facebook")) return false;
if(verilenSite == 4 && çıkan.includes("facebook")) return true;

if(verilenSite == 2 && !çıkan.includes("twitch")) return false;
if(verilenSite == 2 && çıkan.includes("twitch")) return true;

}, "Specify a correct address URL.");

$.validator.addMethod('araCheck', function (value, element, param) {
let url =  $("#inputbox").val()
let arama =  $("#ara").val()

if(!url && arama) return true;
if(!url && !arama) return false;

}, "⚠️ Or type the video you want from this section and press the 'Search Video' button.");
 
$.validator.addMethod('insta', function (value, element, param) {
let verilenSite =  $("#site").val()
let çıkan = value


if(verilenSite == 6) return false;
else return true;

}, "Unfortunately, the system does not currently support the Instagram service. - VERY SOON -"); 

$(document).ready(function () {
    $("#donusturmeFormu").validate({

        rules: {
            link: {
                required: true,
                url: true,
                videoCheck: true,
            },
            site: {
                required: true,
                notEqualToString: '0',   
                insta: true               
            },
            sistem: {
                required: true,
                notEqualToString: '0',   
         },
         ara: {
                araCheck: true,
         },
        },
        messages: {
            messages: {
                link:
                {
                    required: "⚠️ Paste the URL of the video you will download here,",
                    url: "⚠️ You entered an incorrect URL format, make sure the video download site at the top is correct.",
                },
                site: {
                    required: "⚠️ You must specify the site of the video you will download in this section.",
                    notEqualToString: "⚠️ You must specify the site of the video you will download in this section.",
                    insta: "⚠️ Unfortunately, the system does not currently support the Instagram service. - VERY SOON -",

                  },
                  sistem: {
                  required: "⚠️ Select the format in which the video will be converted; This field cannot be left blank!",
                  notEqualToString: "⚠️ Select the format in which the video will be converted; This field cannot be left blank!"
                  
                  },
                  ara: {

                  }
            }
        }
    }
    );

});
