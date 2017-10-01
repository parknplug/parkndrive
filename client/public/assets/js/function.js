function timeConverter(inTimestamp){
  var nowTimestamp = Math.floor(Date.now() / 1000);
  var nowTimestamp = Math.floor(Date.now() / 1000);

  var inDate = new Date(inTimestamp*1000);
  var nowDate = new Date(nowTimestamp*1000);
  var yesterdatDate = new Date((nowTimestamp-60*60*24)*1000);

  var months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];

  var year = inDate.getFullYear();
  var month = months[inDate.getMonth()];
  var day = inDate.getDate();
  var hour = inDate.getHours();
  var min = addZero(inDate.getMinutes());
  var sec = inDate.getSeconds();
  var time;

  if(inTimestamp > nowTimestamp - 60) {
    time = "Il y a moins d'une minute";
  }
  else if(""+year+month+day == ""+nowDate.getFullYear()+months[nowDate.getMonth()]+nowDate.getDate()) {
    time = "Aujourd'hui, " + hour + "h" + min;
  }
  else if (""+year+month+day == ""+yesterdatDate.getFullYear()+months[yesterdatDate.getMonth()]+yesterdatDate.getDate()) {
    time = "Hier, " + hour + "h" + min;
  }
  else {
    time = day + ' ' + month + ' ' + year;
  }
  return time;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function textTransformAt(text){

    var regex   = /(^|[^@\w])@(\w+)\b/g,
        replace = '$1<a class="blue" href="#/profile/$2">@$2</a>';

    return text.replace( regex, replace );
}

function textTransformHashtag(text){

    var regex   = /(^|[^@\w])#(\w+)\b/g,
        replace = '$1<a class="blue" href="#/hashtag/$2">#$2</a>';

    return text.replace( regex, replace );
}




