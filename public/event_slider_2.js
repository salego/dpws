//Initiate first thumbnail image selection
document.getElementsByClassName("thumbNail")[0].click();
//Adjust height of all the thumbnail images to same as width
var thumbNails = document.getElementsByClassName("thumbNail");
var j = 0;
for (j=0; j< thumbNails.length; j++){
    //console.log('Tumb width: ', thumbNails[j].clientWidth);  
    thumbNails[j].style.maxHeight = thumbNails[j].clientWidth+"px"; //clientWidth gives visible width of the image
    console.log('Tumb Height, width: ', thumbNails[j].clientHeight, thumbNails[j].clientWidth);  
    if (thumbNails[j].clientHeight < thumbNails[j].clientWidth){
        console.log("Margin: ",((thumbNails[j].clientWidth-thumbNails[j].clientHeight)/2)+"px");
        thumbNails[j].style.marginTop = ((thumbNails[j].clientWidth-thumbNails[j].clientHeight)/2)+"px";
    }
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(nThImage) {
    //console.log('Visible WIdth & height of thumbnail: ', this.clientWidth, this.clientHeight);
    var i = 1;
    var dots = document.getElementsByClassName("thumbNail");
    for (i = 0; i < dots.length; i++) {
        dots[i].style.opacity = 0.4;
    }
    dots[nThImage-1].style.opacity = 1;
    
    this.opacity = 1;  
    var imagePath = "wp-content/uploads/2017/events/";
    var imageList = [   "wp-content/uploads/2017/events/mothers_day.jpg",
                        "wp-content/uploads/2017/events/art_craft.jpg",
                        "wp-content/uploads/2017/events/chess_champ.jpg",
                        "wp-content/uploads/2017/events/kids_carnival.jpg",                        
                        "wp-content/uploads/2017/events/parents_visit.jpg",
                        "wp-content/uploads/2017/events/soft_launch.jpg",
                        "wp-content/uploads/2017/events/vana_mahostav.jpg",
                        "wp-content/uploads/2017/events/kids_painting_1.jpg",
                        "wp-content/uploads/2017/events/kids_painting_2.jpg",
                        "wp-content/uploads/2017/events/kids_painting_3.jpg"];
    var mainImgDiv = document.getElementsByClassName("eventsMainImg")[0];
    mainImgDiv.style.background = "url(" + imageList[nThImage-1] +")";
    mainImgDiv.style.backgroundRepeat = "no-repeat";
    mainImgDiv.style.backgroundPosition = "center";
    mainImgDiv.style.backgroundSize = "contain";
    //console.log('imgToDisplay: ',imgToDisplay);
    var imageDetails = new Image();
    imageDetails.onload = function(){
        console.log('Lets see Width and Height: ', imageDetails.width, imageDetails.height);
        if (imageDetails.height < 500) {
        mainImgDiv.style.height = imageDetails.height+"px";} else {
            mainImgDiv.style.height = "500px";
        }

    }
    imageDetails.src = imageList[nThImage-1];
    //var dots = document.getElementsByClassName("thumbNail");
    var captionText = document.getElementById("caption");
    captionText.innerHTML = "text....";
}